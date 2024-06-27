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
import { BaseRecord, MetaQuery } from '@refinedev/core';
import type { TableProps } from 'antd/es/table';

export interface QuickTableProps extends TableProps<BaseRecord> {
  resource: string;
  onSearch?: (text: string) => void;
  meta?: MetaQuery | undefined;
  pageTitle?: string;
  minimal?: boolean;
  setDataReference?: (data: any) => void;
}

export const QuickTableSection = <
  T extends {
    _id: string;
  }
>({
  pageTitle,
  resource,
  onSearch,
  meta,
  minimal = false,
  ...props
}: QuickTableProps) => {
  const { tableProps, setFilters } = useTable({
    syncWithLocation: true,
    resource,
    sorters: {
      mode: 'server',
    },
    filters: {
      mode: 'server',
    },
    meta,
  });

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

  useEffect(() => {
    if (props.setDataReference) {
      props.setDataReference(tableProps.dataSource);
    }
  }, [tableProps.dataSource]);

  const searchComponent = (
    <Search
      placeholder="Search"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );

  const pageHeader = (
    <List
      headerProps={{
        title: (
          <Space direction="vertical">
            <PageHeader title={pageTitle} />
            {searchComponent}
          </Space>
        ),
      }}
      headerButtonProps={{
        size: 'middle',
      }}
      headerButtons={
        <>
          <CreateButton size="middle" type="primary" />
        </>
      }
    ></List>
  );

  const tableComponent = (
    <Table
      {...props}
      {...tableProps}
      columns={[
        ...props.columns,
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
      showSorterTooltip
      rowKey="_id"
    />
  );

  if (minimal)
    return (
      <>
        <div
          style={{
            margin: 14,
          }}
        >
          {searchComponent}
        </div>
        {tableComponent}
      </>
    );

  return (
    <>
      {pageHeader}
      {tableComponent}
    </>
  );
};
