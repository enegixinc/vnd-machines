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
        const data = await vndClient.machines.getMany({
          filter: [
            `orderCreatedAt||$gte||${dateRange?.[0].toISOString()}`,
            `orderCreatedAt||$lte||${dateRange?.[1].toISOString()}`,
          ],
        });
        setMachines(data.data);
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

  useEffect(() => {
    orders.forEach((order) => {
      setStats((prev) => ({
        totalSales: prev.totalSales + order.totalSales,
        totalOrders: prev.totalOrders + 1,
        totalRevenue: prev.totalRevenue + order.totalRevenue,
      }));
    });

    console.log('stats', stats);
  }, [dateRange]);
  if (isLoading) {
    return <Spin size="large" />;
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
        <RangePicker
          style={{
            width: '100%',
            marginTop: '16px',
          }}
          onChange={(dates) => setDateRange(dates)}
        />
      </Modal>
      <Carousel dots arrows draggable slidesToShow={4} infinite={false}>
        {[...machines, ...machines].map((machine) => (
          <div style={{ margin: '' }} key={machine.id}>
            <Card
              key={machine.id}
              styles={{
                body: {},
              }}
              title={machine.description}
              bordered={false}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Card.Meta title={'Orders'} description={machine.totalOrders} />
                <Card.Meta
                  title={'Sales'}
                  description={formatPrice(machine.totalSales)}
                />
                <Card.Meta
                  title={'Revenue'}
                  description={formatPrice(machine.totalRevenue)}
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
