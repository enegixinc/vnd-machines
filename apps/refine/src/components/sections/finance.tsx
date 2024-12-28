import { Descriptions, Divider, Typography } from 'antd';
import { TextField } from '@refinedev/antd';
import { formatPrice } from '@helpers';
import { useGetIdentity } from '@refinedev/core';
import { IUserEntity, UserRole } from '@core';

export const ShowFinance = ({
  record,
}: {
  record: {
    totalSoldProducts: number;
    totalOrders: number;
    totalRevenue: number;
    totalActiveRevenue: number;
  };
}) => {
  const userRole = useGetIdentity<IUserEntity>()?.data?.role;
  const isAdmin = userRole === UserRole.ADMIN;

  const { Title } = Typography;

  return (
    <>
      <Title level={3}>{'Finance'}</Title>
      <Descriptions
        labelStyle={{
          fontWeight: 'bold',
          width: '20%',
        }}
        bordered
        column={3}
      >
        <Descriptions.Item label="Orders">
          <TextField value={record.totalOrders} />
        </Descriptions.Item>
        <Descriptions.Item label="Sold Products">
          <TextField value={record.totalSoldProducts} />
        </Descriptions.Item>
      </Descriptions>
      <Divider
        dashed
        style={{
          margin: '8px 0',
        }}
      />
      <Descriptions
        labelStyle={{
          fontWeight: 'bold',
          width: '20%',
        }}
        bordered
        column={3}
      >
        <Descriptions.Item label="Sales">
          <TextField value={formatPrice(record.totalSales)} />
        </Descriptions.Item>
        <Descriptions.Item label="Revenue">
          <TextField
            value={
              isAdmin
                ? formatPrice(record.totalRevenue)
                : formatPrice(record.totalSales - record.totalRevenue)
            }
          />
        </Descriptions.Item>
        {isAdmin && (
          <Descriptions.Item label="Active Revenue">
            <TextField value={formatPrice(record.totalActiveRevenue)} />
          </Descriptions.Item>
        )}
      </Descriptions>
    </>
  );
};
