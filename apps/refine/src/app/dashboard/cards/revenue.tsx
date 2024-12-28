'use client';
import { Card, Select } from 'antd';
import { useEffect, useState } from 'react';
import { DashboardOutlined } from '@ant-design/icons';
import { vndClient } from '@providers/api';
import { formatPrice } from '@helpers';

export const RevenueCard = () => {
  const { Option } = Select;
  const [statsData, setStatsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { totalActiveRevenue } =
        await vndClient.products.productsControllerStats();
      setStatsData(totalActiveRevenue);
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  if (isLoading)
    return (
      <Card>
        <Card.Meta
          avatar={<DashboardOutlined />}
          title={'Active Contracts'}
          description="Loading..."
          style={{
            marginTop: 3.85,
            color: '#1890ff',
          }}
        />
      </Card>
    );

  return (
    <Card
      styles={{
        body: {
          color: '#1890ff',
          marginTop: 6.85,
        },
      }}
    >
      <Card.Meta
        title={'Active Revenue'}
        avatar={<DashboardOutlined />}
        description={formatPrice(statsData ?? 0)}
      />
    </Card>
  );
};
