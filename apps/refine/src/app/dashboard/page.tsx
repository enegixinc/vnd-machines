'use client';
import { Card, Col, Row, Space } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { DashboardLatestOrders } from '@app/dashboard/latest-orders';
import { SalesCard } from '@app/dashboard/cards/sales';
import { MachinesSales } from '@app/dashboard/machines-sales';
import { SalesPie } from '@app/dashboard/sales-pie';
import { TopProductsTable } from '@app/dashboard/top-products/top-products';

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
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={8}>
          <SalesCard />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <MachinesSales />
        </Col>
        <Col span={8}>
          <SalesPie />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <DashboardLatestOrders />
        </Col>
        <Col span={12}>
          <TopProductsTable />
        </Col>
      </Row>
    </Space>
  );
};

export default Dashboard;
