import { Line } from '@ant-design/plots';
import React, { useEffect } from 'react';
import { Card } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { vndClient } from '@providers/api';

export const MachinesSales = () => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await vndClient.machines.machinesControllerStats();

      const processedData = response.machines.flatMap((machine) =>
        machine.sumTotal.map((item) => ({
          month: item.abbreviation,
          value: parseFloat(item.value),
          machine: machine.description.trim(),
        }))
      );

      setData(processedData);
    };
    fetchData();
  }, []);

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'machine',
    colorField: 'machine',
    point: {
      shape: 'square',
      size: 4,
    },
    tooltip: {
      fields: ['month', 'machine', 'value'],
      formatter: (datum) => ({
        name: datum.machine,
        value: `Month: ${datum.month}, Sales: ${datum.value} KD`,
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
