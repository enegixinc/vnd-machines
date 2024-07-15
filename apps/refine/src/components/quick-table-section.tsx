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
import { Space, Table } from 'antd';
import Search from 'antd/es/input/Search';
import { BaseRecord, CrudFilter, CrudSort, MetaQuery } from '@refinedev/core';
import type { TableProps } from 'antd/es/table';
import { useTableProps } from '@refinedev/antd/src/hooks/table/useTable/useTable';

export interface QuickTableProps extends TableProps<BaseRecord> {
  resource?: string;
  onSearch?: (text: string) => void;
  meta?: MetaQuery | undefined;
  filters?: {
    initial?: CrudFilter[] | undefined;
    permanent?: CrudFilter[] | undefined;
    hidden?: CrudFilter[] | undefined;
  };
  useTableProps?: useTableProps<any, any, any, any>;
  sorters?:
    | {
        initial?: CrudSort[] | undefined;
        permanent?: CrudSort[] | undefined;
        mode?: 'server' | 'off' | undefined;
      }
    | undefined;

  pageTitle?: string;
  minimal?: boolean;
  setDataReference?: (data: any) => void;
  showActions?: boolean;
  showEdit?: boolean;
  showSearch?: boolean;
  canCreate?: boolean;
  syncWithLocation?: boolean;
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
  showActions = true,
  showSearch = true,
  showEdit = true,
  canCreate = true,
  syncWithLocation = true,
  ...props
}: QuickTableProps) => {
  const { tableProps, setFilters } = useTable({
    syncWithLocation,
    resource,
    sorters: {
      mode: 'server',
      ...props.sorters,
    },
    filters: {
      mode: 'server',
      ...props.filters,
    },
    meta,
    ...props.useTableProps,
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

  const searchComponent = showSearch && (
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
        props.canCreate && (
          <>
            <CreateButton size="middle" type="primary" />
          </>
        )
      }
    ></List>
  );

  const tableComponent = (
    <Table
      {...props}
      {...tableProps}
      columns={[
        ...props.columns,
        ...(showActions
          ? [
              {
                title: 'Actions',
                key: 'actions',
                render: (record: T) => (
                  <Space>
                    {showEdit && (
                      <EditButton
                        hideText
                        size="small"
                        recordItemId={record._id}
                      />
                    )}
                    <ShowButton
                      hideText
                      size="small"
                      recordItemId={record._id}
                    />
                    <DeleteButton
                      resource={resource}
                      hideText
                      size="small"
                      recordItemId={record._id}
                    />
                  </Space>
                ),
              },
            ]
          : []),
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
