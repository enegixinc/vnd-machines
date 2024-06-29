import React from 'react';
import { Card, Typography } from 'antd';
import { Pie } from '@ant-design/plots';
import { vndClient } from '@providers/api';
import { UnorderedListOutlined } from '@ant-design/icons';

export const SalesPie = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await vndClient.categories.getMany({
        join: ['orders'],
        limit: 4,
        sort: ['totalOrders,DESC'],
      });
      setData(
        data.data.map((item) => ({
          name: item.fullName,
          value: item.orders.length,
        }))
      );
    };
    fetchData();
  }, []);

  const config = {
    data,
    angleField: 'value',
    colorField: 'name',
    legend: false,
    innerRadius: 0.6,
    labels: [
      { text: 'name', style: { fontSize: 10, fontWeight: 'bold' } },
      {
        text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
        style: {
          fontSize: 9,
          dy: 12,
        },
      },
    ],
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 10,
    },
    scale: {
      color: {
        palette: 'spectral',
        offset: (t) => t * 0.8 + 0.1,
      },
    },
  };
  return (
    <Card
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <UnorderedListOutlined />
          <span>Orders by Category</span>
        </div>
      }
    >
      <Pie {...config} />
    </Card>
  );
};
