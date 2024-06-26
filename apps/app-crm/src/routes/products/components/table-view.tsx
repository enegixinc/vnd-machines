import {
  DeleteButton,
  FilterDropdown,
  getDefaultSortOrder,
  ShowButton,
} from '@refinedev/antd';
import {
  type CrudFilters,
  type CrudSorting,
  getDefaultFilter,
} from '@refinedev/core';

import { PhoneOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Table, type TableProps } from 'antd';

import { PaginationTotal, Text } from '@/components';
import { ContactStatusEnum } from '@/enums';
import { useCompaniesSelect } from '@/hooks/useCompaniesSelect';
import { SerializedProductDto } from '@frontend/api-sdk';

type Product = SerializedProductDto;

type Props = {
  tableProps: TableProps<Product>;
  filters: CrudFilters;
  sorters: CrudSorting;
};

const statusOptions = Object.keys(ContactStatusEnum).map((key) => ({
  label: `${key[0]}${key.slice(1).toLowerCase()}`,
  value: ContactStatusEnum[key as keyof typeof ContactStatusEnum],
}));

export const TableView: React.FC<Props> = ({
  tableProps,
  filters,
  sorters,
}) => {
  const { selectProps } = useCompaniesSelect();
  console.log('tableProps', tableProps);

  return (
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        pageSizeOptions: ['12', '24', '48', '96'],
        showTotal: (total) => (
          <PaginationTotal total={total} entityName="contacts" />
        ),
      }}
      rowKey="_id"
    >
      <Table.Column
        dataIndex="name"
        title="Name"
        width={200}
        defaultFilteredValue={getDefaultFilter('name', filters)}
        defaultSortOrder={getDefaultSortOrder('name', sorters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder="Search Name" />
          </FilterDropdown>
        )}
        render={(_, record: Product) => (
          <Space>
            {/* <CustomAvatar src={record.productPictures[0]} name={record.name} /> */}
            <Text>{record.upc}</Text>
          </Space>
        )}
      />
      {/*<Table.Column*/}
      {/*  dataIndex="email"*/}
      {/*  title="Email"*/}
      {/*  defaultFilteredValue={getDefaultFilter('email', filters)}*/}
      {/*  defaultSortOrder={getDefaultSortOrder('email', sorters)}*/}
      {/*  filterDropdown={(props) => (*/}
      {/*    <FilterDropdown {...props}>*/}
      {/*      <Input placeholder="Search Email" />*/}
      {/*    </FilterDropdown>*/}
      {/*  )}*/}
      {/*/>*/}
      <Table.Column
        dataIndex="name.ar"
        title="Name"
        defaultFilteredValue={getDefaultFilter('company.id', filters)}
        defaultSortOrder={getDefaultSortOrder('company.id', sorters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Select
              placeholder="Search Company"
              style={{ width: 220 }}
              {...selectProps}
            />
          </FilterDropdown>
        )}
        render={(_, record: Product) => <span>{record?.upc}</span>}
      />
      <Table.Column
        dataIndex="upc"
        title="Title"
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder="Search Title" />
          </FilterDropdown>
        )}
      />
      {/*<Table.Column*/}
      {/*  dataIndex="status"*/}
      {/*  title="Status"*/}
      {/*  sorter*/}
      {/*  defaultFilteredValue={getDefaultFilter('status', filters)}*/}
      {/*  defaultSortOrder={getDefaultSortOrder('status', sorters)}*/}
      {/*  filterDropdown={(props) => (*/}
      {/*    <FilterDropdown {...props}>*/}
      {/*      <Select*/}
      {/*        style={{ width: '200px' }}*/}
      {/*        defaultValue={null}*/}
      {/*        mode="multiple"*/}
      {/*        options={statusOptions}*/}
      {/*      />*/}
      {/*    </FilterDropdown>*/}
      {/*  )}*/}
      {/*  render={(value: ContactStatusEnum) => <ContactStatusTag status={value} />}*/}
      {/*/>*/}
      <Table.Column<Product>
        fixed="right"
        title="Actions"
        dataIndex="actions"
        render={(_, record) => (
          <Space>
            <ShowButton hideText size="small" recordItemId={record._id} />
            <Button
              size="small"
              href="tel:1234567890"
              // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
              icon={<PhoneOutlined />}
            />
            <DeleteButton hideText size="small" recordItemId={record._id} />
          </Space>
        )}
      />
    </Table>
  );
};
