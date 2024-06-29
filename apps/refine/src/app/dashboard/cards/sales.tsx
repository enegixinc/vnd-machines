'use client';
import { Card, Col, Row, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { DashboardOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { vndClient } from '@providers/api';
import { Space } from 'antd';

export const SalesCard = () => {
  const { Option } = Select;
  const [statsData, setStatsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const periods = ['all', 'today', 'last7Days', 'lastMonth', 'lastYear'];

  useEffect(() => {
    const fetchStats = async () => {
      const data = await vndClient.orders.ordersControllerStats();
      setStatsData(data.totalSales);
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
  };

  if (isLoading)
    return (
      <Card>
        <Card.Meta
          avatar={<DashboardOutlined />}
          title={
            <CardTitleWithPeriods
              title="Sales"
              periods={periods}
              handlePeriodChange={handlePeriodChange}
            />
          }
          description="Loading..."
        />
      </Card>
    );

  return (
    <Card>
      <Card.Meta
        title={
          <CardTitleWithPeriods
            title="Sales"
            periods={periods}
            handlePeriodChange={handlePeriodChange}
          />
        }
        avatar={<DashboardOutlined />}
        description={statsData[selectedPeriod] + ' KD'}
      />
    </Card>
  );
};

export const CardTitleWithPeriods = ({
  title,
  periods,
  handlePeriodChange,
}: {
  title: string;
  periods: string[];
  handlePeriodChange: (value: string) => void;
}) => {
  return (
    <Space
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Typography.Title level={5}>{title}</Typography.Title>
      <Select
        defaultValue="all"
        style={{ width: 120 }}
        onChange={handlePeriodChange}
      >
        {periods.map((period) => (
          <Select.Option key={period} value={period}>
            {period}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};
