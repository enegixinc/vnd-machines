'use client';

import React, { useEffect } from 'react';
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
import { BaseRecord, MetaQuery } from '@refinedev/core';
import { RollbackOutlined } from '@ant-design/icons';
import { vndClient } from '@providers/api';

export interface QuickTableProps {
  title: string;
  resource: string;
  columns: (ColumnGroupType<BaseRecord> | ColumnType<BaseRecord>)[];
  onSearch?: (text: string) => void;
  meta?: MetaQuery | undefined;
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
  meta,
}: QuickTableProps) => {
  const [showDeleted, setShowDeleted] = React.useState(false);

  const { tableProps, filters, setFilters } = useTable({
    syncWithLocation: true,
    resource,
    sorters: {
      mode: 'server',
    },
    filters: {
      mode: 'server',
    },
    meta: {
      ...meta,
      // includeDeleted: 1,
    },
  });

  // const toggleDeleted = () => {
  //   setShowDeleted((prevState) => !prevState);
  //   setFilters((prevFilters) => {
  //     const newFilters = [...prevFilters];
  //     const deletedFilter = newFilters.find(
  //       // @ts-ignore
  //       (filter) => filter.field === 'deletedAt'
  //     );
  //     if (deletedFilter) {
  //       newFilters.splice(newFilters.indexOf(deletedFilter), 1);
  //     } else {
  //       newFilters.push({
  //         field: 'deletedAt',
  //         operator: 'nnull',
  //         value: '',
  //       });
  //     }
  //     return newFilters;
  //   });
  // };

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
          {/*<Button onClick={toggleDeleted}>*/}
          {/*  {showDeleted ? 'Hide Deleted' : 'Show Deleted'}*/}
          {/*</Button>*/}
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
