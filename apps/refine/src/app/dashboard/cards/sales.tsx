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
  const periods = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'today',
      label: 'Today',
    },
    {
      value: 'last7Days',
      label: 'Last 7 Days',
    },
    {
      value: 'lastMonth',
      label: 'Last Month',
    },
    {
      value: 'lastYear',
      label: 'Last Year',
    },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState(periods[0].value);

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
  periods: { value: string; label: string }[];
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
      <Typography.Title
        style={{
          fontWeight: 'bold',
        }}
        level={5}
      >
        {title}
      </Typography.Title>
      <Select
        defaultValue="all"
        style={{ width: 120 }}
        onChange={handlePeriodChange}
      >
        {periods.map((period) => (
          <Select.Option key={period.label} value={period.value}>
            {period.label}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};
