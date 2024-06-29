import { Line } from '@ant-design/plots';
import React from 'react';
import { Card, Typography } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

export const MachinesSales = () => {
  const data = [
    { month: 'Jan', value: 3, machine: 'Machine A' },
    { month: 'Feb', value: 4, machine: 'Machine A' },
    { month: 'Mar', value: 3.5, machine: 'Machine A' },
    { month: 'Apr', value: 5, machine: 'Machine A' },
    { month: 'May', value: 4.9, machine: 'Machine A' },
    { month: 'Jun', value: 6, machine: 'Machine A' },
    { month: 'Jul', value: 7, machine: 'Machine A' },
    { month: 'Aug', value: 9, machine: 'Machine A' },
    { month: 'Sep', value: 13, machine: 'Machine A' },
    { month: 'Oct', value: 10, machine: 'Machine A' },
    { month: 'Nov', value: 12, machine: 'Machine A' },
    { month: 'Dec', value: 14, machine: 'Machine A' },
    { month: 'Jan', value: 2, machine: 'Machine B' },
    { month: 'Feb', value: 3, machine: 'Machine B' },
    { month: 'Mar', value: 3.2, machine: 'Machine B' },
    { month: 'Apr', value: 4.5, machine: 'Machine B' },
    { month: 'May', value: 4.0, machine: 'Machine B' },
    { month: 'Jun', value: 5.5, machine: 'Machine B' },
    { month: 'Jul', value: 6.5, machine: 'Machine B' },
    { month: 'Aug', value: 8, machine: 'Machine B' },
    { month: 'Sep', value: 12, machine: 'Machine B' },
    { month: 'Oct', value: 9, machine: 'Machine B' },
    { month: 'Nov', value: 11, machine: 'Machine B' },
    { month: 'Dec', value: 13, machine: 'Machine B' },
    { month: 'Jan', value: 1, machine: 'Machine C' },
    { month: 'Feb', value: 2, machine: 'Machine C' },
    { month: 'Mar', value: 2.5, machine: 'Machine C' },
    { month: 'Apr', value: 3, machine: 'Machine C' },
    { month: 'May', value: 3.5, machine: 'Machine C' },
    { month: 'Jun', value: 4, machine: 'Machine C' },
    { month: 'Jul', value: 5, machine: 'Machine C' },
    { month: 'Aug', value: 6, machine: 'Machine C' },
    { month: 'Sep', value: 8, machine: 'Machine C' },
    { month: 'Oct', value: 7, machine: 'Machine C' },
    { month: 'Nov', value: 9, machine: 'Machine C' },
    { month: 'Dec', value: 11, machine: 'Machine C' },
  ];

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'machine',
    colorField: 'machine', // assign different colors to each machine
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    tooltip: {
      fields: ['month', 'machine', 'value'],
      formatter: (datum) => ({
        name: datum.machine,
        value: `Month: ${datum.month}, Sales: ${datum.value}`,
      }),
      showMarkers: false,
    },
    lineStyle: {
      lineWidth: 2,
    },
    smooth: true,
    legend: {
      position: 'top-left',
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
          <span>Machines Sales</span>
        </div>
      }
    >
      <Line {...config} />
    </Card>
  );
};
