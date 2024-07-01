'use client';
import { Card, Col, Row, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { DashboardOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { vndClient } from '@providers/api';
import { Space } from 'antd';

export const ContractsCard = () => {
  const { Option } = Select;
  const [statsData, setStatsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await vndClient.contracts.getMany({
        filter: ['status||$eq||active'],
      });
      console.log('data', data);
      setStatsData(data.total);
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
        title={'Active Contracts'}
        avatar={<DashboardOutlined />}
        description={statsData.toString()}
      />
    </Card>
  );
};
