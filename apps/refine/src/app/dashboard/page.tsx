'use client';
import { Card, Col, Row } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { DashboardLatestOrders } from '@app/dashboard/latest-orders';

const Dashboard = () => {
  const kpiData = [
    { title: 'Total Sales', value: '$20,000', icon: <DashboardOutlined /> },
    { title: 'New Customers', value: '150', icon: <UserOutlined /> },
    { title: 'Orders', value: '320', icon: <ShoppingCartOutlined /> },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16}>
        {kpiData.map((kpi, index) => (
          <Col span={8} key={index}>
            <Card>
              <Card.Meta
                avatar={kpi.icon}
                title={kpi.title}
                description={kpi.value}
              />
            </Card>
          </Col>
        ))}

        <DashboardLatestOrders />
      </Row>
    </div>
  );
};

export default Dashboard;
