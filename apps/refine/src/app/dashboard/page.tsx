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
import { ContractsCard } from '@app/dashboard/cards/contracts';
import { RevenueCard } from '@app/dashboard/cards/revenue';

const Dashboard = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={8}>
          <SalesCard />
        </Col>
        <Col span={8}>
          <ContractsCard />
        </Col>
        <Col span={8}>
          <RevenueCard />
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
