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
          // fields: ['createdAt', 'searchableText'],
        });
        // const injectDescription = (machine: { searchableText: string }) => {
        //   // "searchableText": "657ab86ec7201f469894300f | 5687 | ZAIN",
        //   Object.assign(machine, {
        //     description: machine.searchableText.split('|')[2].trim(),
        //   });
        //   return machine;
        // };
        data.data = data.data.map((machine) => {
          Object.assign(machine, {
            description: machine.searchableText.split('|')[2].trim(),
          });
          return machine;
        });
        setMachines(data.data);
      } catch (error) {
        console.error('Failed to fetch machine stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    console.log(
      'dateRange',
      dateRange?.map((date) => date.toISOString())
    );

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
  // if (isLoading) {
  //   return <Spin size="large" />;
  // }
  //
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
      <Carousel draggable slidesToShow={4} infinite={false}>
        {machines.length === 0
          ? Array.from({ length: 4 }).map((_, index) => (
              <MachineCardSkeleton key={index} />
            ))
          : machines.map((machine) => (
              <div key={machine.id}>
                <Card
                  key={machine.id}
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
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Card.Meta
                      title={'Orders'}
                      description={machine.totalOrders}
                    />
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
