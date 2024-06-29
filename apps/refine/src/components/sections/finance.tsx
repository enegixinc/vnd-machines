import { Descriptions, Typography } from 'antd';
import { TextField } from '@refinedev/antd';
import { Divider } from 'antd';

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
        <Descriptions.Item label="Total Sales">
          <TextField value={record.totalRevenue} />
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
        column={2}
      >
        <Descriptions.Item label="Total Revenue">
          <TextField value={record.totalRevenue} />
        </Descriptions.Item>
        <Descriptions.Item label="Active Revenue">
          <TextField value={record.totalActiveRevenue} />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
