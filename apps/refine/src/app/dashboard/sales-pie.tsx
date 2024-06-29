import React, { useState, useEffect } from 'react';
import { Card, Typography, Select } from 'antd';
import { Pie } from '@ant-design/plots';
import { vndClient } from '@providers/api';
import { UnorderedListOutlined } from '@ant-design/icons';

const { Option } = Select;

type DataType = {
  name: string;
  value: number;
};

export const SalesPie = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [categoryOrBrand, setCategoryOrBrand] = useState<
    'categories' | 'brands'
  >('categories');

  useEffect(() => {
    const fetchData = async () => {
      const endpoint =
        categoryOrBrand === 'categories' ? 'categories' : 'brands';
      const dataResponse = await vndClient[endpoint].getMany({
        join: ['orders'],
        limit: 4,
        sort: ['totalOrders,DESC'],
      });
      setData(
        dataResponse.data.map((item: any) => ({
          name: item.fullName,
          value: item.orders.length,
        }))
      );
    };
    fetchData();
  }, [categoryOrBrand]);

  const config = {
    data,
    angleField: 'value',
    colorField: 'name',
    legend: false,
    innerRadius: 0.6,
    labels: [
      { text: 'name', style: { fontSize: 10, fontWeight: 'bold' } },
      {
        text: (d: any, i: number, data: any[]) =>
          i < data.length - 3 ? d.value : '',
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
        offset: (t: number) => t * 0.8 + 0.1,
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
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '8px',
            }}
          >
            <UnorderedListOutlined />
            <span>
              Orders by{' '}
              {categoryOrBrand.charAt(0).toUpperCase() +
                categoryOrBrand.slice(1)}
            </span>
          </div>
          <Select
            value={categoryOrBrand}
            onChange={(value) => setCategoryOrBrand(value)}
            style={{ marginLeft: '8px' }}
          >
            <Option value="categories">Categories</Option>
            <Option value="brands">Brands</Option>
          </Select>
        </div>
      }
    >
      <Pie {...config} />
    </Card>
  );
};
