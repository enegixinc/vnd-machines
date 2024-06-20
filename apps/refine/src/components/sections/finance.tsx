import { Descriptions, Typography } from 'antd';
import { TextField } from '@refinedev/antd';

export const ShowFinance = ({
  record,
}: {
  record: {
    totalSoldProducts: number;
    totalOrders: number;
    totalRevenue: number;
  };
}) => {
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
        <Descriptions.Item label="Total Sold Products">
          <TextField value={record.totalSoldProducts} />
        </Descriptions.Item>
        <Descriptions.Item label="Total Orders">
          <TextField value={record.totalOrders} />
        </Descriptions.Item>
        <Descriptions.Item label="Total Revenue">
          <TextField value={record.totalRevenue} />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
