'use client';
import { Col, Row, Space } from 'antd';
import { DashboardLatestOrders } from '@app/dashboard/latest-orders';
import { SalesCard } from '@app/dashboard/cards/sales';
import { MachinesSales } from '@app/dashboard/machines-sales';
import { SalesPie } from '@app/dashboard/sales-pie';
import { TopProductsTable } from '@app/dashboard/top-products/top-products';
import { ContractsCard } from '@app/dashboard/cards/contracts';
import { RevenueCard } from '@app/dashboard/cards/revenue';
import { CanAccess, useGetIdentity, useGo } from '@refinedev/core';
import { IUserEntity, UserRole } from '@core';

const Dashboard = () => {
  const go = useGo();
  const userRole = useGetIdentity<IUserEntity>()?.data?.role;
  console.log('userRole', userRole);
  if (userRole === UserRole.SUPPLIER) go({ to: '/products' });

  return (
    <CanAccess action="list" resource="dashboard">
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
    </CanAccess>
  );
};

export default Dashboard;
