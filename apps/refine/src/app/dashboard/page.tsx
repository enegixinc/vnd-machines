'use client';
import { Card, Col, Row } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { DashboardLatestOrders } from '@app/dashboard/latest-orders';
import { SalesCard } from '@app/dashboard/cards/sales';

const Dashboard = () => {
  const kpiData = [
    { title: 'Total Sales', value: '$20,000', icon: <DashboardOutlined /> },
    {
      title: 'Total Revenue',
      value: '$10,000',
      icon: <ShoppingCartOutlined />,
    },
    { title: 'Active Contracts', value: '10', icon: <UserOutlined /> },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16}>
        <Col span={8}>
          <SalesCard />
        </Col>
      </Row>
      <DashboardLatestOrders />
    </div>
  );
};

export default Dashboard;
