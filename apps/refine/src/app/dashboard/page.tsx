'use client';
import { Col, Row, Space } from 'antd';
import { DashboardLatestOrders } from '@app/dashboard/latest-orders';
import { SalesCard } from '@app/dashboard/cards/sales';
import { MachinesSales } from '@app/dashboard/machines-sales';
import { SalesPie } from '@app/dashboard/sales-pie';
import { TopProductsTable } from '@app/dashboard/top-products/top-products';
import { ContractsCard } from '@app/dashboard/cards/contracts';
import { RevenueCard } from '@app/dashboard/cards/revenue';
import { CanAccess, useGetIdentity } from '@refinedev/core';
import { IUserEntity, UserRole } from '@core';
import { MachinesCarousel } from '@app/dashboard/machines-carousel/machines';

const Dashboard = () => {
  const userRole = useGetIdentity<IUserEntity>()?.data?.role;

  const isAdmin = userRole === UserRole.ADMIN;
  const isSupplier = userRole === UserRole.SUPPLIER;
  return (
    <CanAccess action="list" resource="dashboard">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {isSupplier && <MachinesCarousel />}
        <Row gutter={16}>
          <Col span={isAdmin ? 8 : 16}>
            <SalesCard />
          </Col>
          <Col hidden={userRole !== UserRole.ADMIN} span={8}>
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
