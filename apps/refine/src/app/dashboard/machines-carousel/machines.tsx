import {
  Button,
  Card,
  Carousel,
  DatePicker,
  Divider,
  Modal,
  Spin,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { vndClient } from '@providers/api';
import { MachineEntity, OrderEntity } from '@frontend/api-sdk';
import { formatPrice } from '@helpers';
import './machines.module.css';
import { JoinedOrdersTableNoMachine } from '@components/joined-orders.table';

const { RangePicker } = DatePicker;

export const MachinesCarousel = () => {
  const { Title, Text } = Typography;
  const [machines, setMachines] = useState<MachineEntity[]>([]);
  const [orders, setOrders] = useState<OrderEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState<{
    totalSales: number;
    totalOrders: number;
    totalRevenue: number;
  }>({
    totalSales: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await vndClient.request.request({
          method: 'GET',
          url: '/machines/machines-stats',
        });
        setMachines(data);
      } catch (error) {
        console.error('Failed to fetch machine stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchOrders = async () => {
      if (!dateRange?.length) {
        return;
      }
      try {
        const data = await vndClient.orders.getMany({
          filter: [
            `createdAt||$gte||${dateRange?.[0].toISOString()}`,
            `createdAt||$lte||${dateRange?.[1].toISOString()}`,
          ],
        });
        setOrders(data.data);
      } catch (error) {
        console.error('Failed to fetch machine stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    fetchOrders();
  }, [dateRange]);

  if (isLoading) {
    return (
      <Carousel draggable slidesToShow={4} infinite={false}>
        {Array.from({ length: 4 }).map((_, index) => (
          <MachineCardSkeleton key={index} />
        ))}
      </Carousel>
    );
  }

  return (
    <>
      <Modal
        width={800}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <RangePicker
          style={{
            width: '100%',
            marginTop: '32px',
          }}
          onChange={(dates) => setDateRange(dates)}
        />
        <JoinedOrdersTableNoMachine
          useTableProps={{
            filters: {
              permanent: [
                {
                  field: 'createdAt',
                  operator: 'gte',
                  value: dateRange?.[0].toISOString(),
                },
                {
                  field: 'createdAt',
                  operator: 'lte',
                  value: dateRange?.[1].toISOString(),
                },
              ],
            },
          }}
        />
      </Modal>
      <Carousel
        style={{
          direction: 'ltr',
        }}
        draggable
        slidesToShow={4}
        infinite={false}
      >
        {machines.map((machine) => (
          <div key={machine._id}>
            <Card
              key={machine._id}
              title={machine.description}
              styles={{
                body: {},
              }}
              bordered={false}
              // widht should be each card dyunamiclyy 1/5 of screen width
              style={{
                marginRight: '16px',
                userSelect: 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Card.Meta title={'Orders'} description={machine.totalorders} />
                <Card.Meta
                  title={'Sales'}
                  description={formatPrice(machine.totalsales)}
                />
                <Card.Meta
                  title={'Revenue'}
                  description={formatPrice(machine.totalrevenue)}
                />
              </div>
              <Divider />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {/*<RangePicker onChange={(dates) => setDateRange(dates)} />*/}
                <Button
                  type="primary"
                  block
                  onClick={() => setIsModalOpen(true)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </>
  );
};

const MachineCardSkeleton = () => {
  return (
    <Card
      title="Loading"
      bordered={false}
      style={{
        marginRight: '16px',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card.Meta title={'Orders'} description={<Spin />} />
        <Card.Meta title={'Sales'} description={<Spin />} />
        <Card.Meta title={'Revenue'} description={<Spin />} />
      </div>
      <Divider />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Button type="primary" block>
          View Details
        </Button>
      </div>
    </Card>
  );
};
