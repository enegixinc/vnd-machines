import React, { useEffect, useState } from 'react';
import { GetProp, Table, TableColumnsType, TransferProps } from 'antd';
import { Transfer } from 'antd';
import { QuickTableSection } from '@components/quick-table-section';
import Search from 'antd/es/input/Search';

type TransferItem = GetProp<TransferProps, 'dataSource'>[number];

interface DataType {
  _id: string;
}

interface TableTransferProps extends TransferProps<TransferItem> {
  resource: string;
  leftColumns: TableColumnsType<DataType>;
  rightColumns: TableColumnsType<DataType>;
}

export const TableTransfer = ({
  leftColumns,
  rightColumns,
  resource,
  ...restProps
}: TableTransferProps) => {
  const [dataReference, setDataReference] = useState([]);
  return (
    <Transfer dataSource={dataReference} {...restProps}>
      {({
        direction,
        filteredItems,
        onItemSelect,
        onItemSelectAll,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const rowSelection = {
          getCheckboxProps: () => ({ disabled: listDisabled }),
          onChange(selectedRowKeys) {
            onItemSelectAll(selectedRowKeys, 'replace');
          },
          selectedRowKeys: listSelectedKeys,
          selections: [
            {
              key: 'all',
              text: 'Select All',
              onSelect: () =>
                onItemSelectAll(
                  filteredItems.map((item) => item._id),
                  'replace'
                ),
            },
            {
              key: 'invert',
              text: 'Invert Selection',
              onSelect: () =>
                onItemSelectAll(
                  filteredItems
                    .filter((item) => !listSelectedKeys.includes(item._id))
                    .map((item) => item._id),
                  'replace'
                ),
            },
            {
              key: 'none',
              text: 'Select None',
              onSelect: () => onItemSelectAll([], 'replace'),
            },
          ],
        };

        return direction === 'left' ? (
          <QuickTableSection
            minimal
            setDataReference={setDataReference}
            resource={resource}
            columns={leftColumns}
            rowSelection={rowSelection}
            onRow={({ _id }) => ({
              onClick: () => {
                if (listDisabled) return;
                onItemSelect(_id, !listSelectedKeys.includes(_id));
              },
            })}
          />
        ) : (
          <>
            <div
              style={{
                margin: 14,
              }}
            >
              <Search
                placeholder="Search"
                onChange={(e) => {
                  restProps.onSearch;
                }}
              />
            </div>
            <Table
              rowSelection={rowSelection}
              columns={rightColumns}
              dataSource={filteredItems}
              size="small"
              style={{ pointerEvents: listDisabled ? 'none' : undefined }}
              onRow={({ _id, disabled }) => ({
                onClick: () => {
                  if (disabled || listDisabled) return;
                  onItemSelect(_id, !listSelectedKeys.includes(_id));
                },
              })}
            />
          </>
        );
      }}
    </Transfer>
  );
};
