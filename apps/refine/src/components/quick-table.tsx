'use client';

import React from 'react';
import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  PageHeader,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { Button, Space, Table } from 'antd';
import Search from 'antd/es/input/Search';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { BaseRecord } from '@refinedev/core';

export interface QuickTableProps {
  title: string;
  resource: string;
  columns: (ColumnGroupType<BaseRecord> | ColumnType<BaseRecord>)[];
  onSearch?: (text: string) => void;
}

export const QuickTable = <
  T extends {
    _id: string;
  }
>({
  title,
  resource,
  columns,
  onSearch,
}: QuickTableProps) => {
  const { tableProps, filters, setFilters } = useTable({
    syncWithLocation: true,
    sorters: {
      mode: 'server',
    },
    filters: {
      mode: 'server',
    },
  });

  const [showDeleted, setShowDeleted] = React.useState(false);

  const handleSearch = (text: string) => {
    if (onSearch) {
      onSearch(text);
    } else {
      setFilters([
        {
          field: 'searchableText',
          value: text,
          operator: 'contains',
        },
      ]);
    }
  };

  return (
    <List
      headerProps={{
        title: (
          <Space direction="vertical">
            <PageHeader title={title} />
            <Search
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Space>
        ),
      }}
      headerButtonProps={{
        size: 'middle',
      }}
      headerButtons={
        <>
          <Button onClick={() => setShowDeleted((prev) => !prev)}>
            {showDeleted ? 'Hide Deleted' : 'Show Deleted'}
          </Button>
          <CreateButton resource={resource} size="middle" type="primary" />
        </>
      }
    >
      <Table
        columns={[
          ...columns,
          {
            title: 'Actions',
            key: 'actions',
            render: (record: T) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record._id} />
                <ShowButton hideText size="small" recordItemId={record._id} />
                <DeleteButton hideText size="small" recordItemId={record._id} />
              </Space>
            ),
          },
        ]}
        {...tableProps}
        showSorterTooltip
        rowKey="_id"
      />
    </List>
  );
};
