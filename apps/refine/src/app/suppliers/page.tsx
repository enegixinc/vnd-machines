'use client';

import { Tag } from 'antd';
import React from 'react';
import { handleEmptyString } from '@helpers';
import { QuickTableSection } from '@components/quick-table-section';
import { CanAccess } from '@refinedev/core';

export default function SuppliersList() {
  return (
    <CanAccess action="list" fallback={<div>Unauthorized</div>}>
      <QuickTableSection
        pageTitle="Suppliers"
        resource="users"
        filters={{
          permanent: [
            {
              field: 'role',
              operator: 'eq',
              value: 'supplier',
            },
          ],
        }}
        columns={[
          {
            title: 'First Name',
            dataIndex: 'firstName',
            render: handleEmptyString,
          },
          {
            title: 'Last Name',
            dataIndex: 'lastName',
            render: handleEmptyString,
          },
          {
            title: 'Email',
            dataIndex: 'email',
            render: handleEmptyString,
          },
          {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            render: handleEmptyString,
          },
          {
            title: 'Business Name',
            dataIndex: 'businessName',
            render: handleEmptyString,
          },
          {
            title: 'Active',
            dataIndex: 'active',
            render: (active) =>
              active ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">Inactive</Tag>
              ),
          },
        ]}
      />
      {/*<Divider />*/}
      {/*<QuickTable*/}
      {/*  title={'Suppliers'}*/}
      {/*  resource={'users'}*/}
      {/*  columns={[*/}
      {/*    {*/}
      {/*      title: 'First Name',*/}
      {/*      dataIndex: 'firstName',*/}
      {/*      render: handleEmptyString,*/}
      {/*    },*/}
      {/*    {*/}
      {/*      title: 'Last Name',*/}
      {/*      dataIndex: 'lastName',*/}
      {/*      render: handleEmptyString,*/}
      {/*    },*/}
      {/*    {*/}
      {/*      title: 'Email',*/}
      {/*      dataIndex: 'email',*/}
      {/*      render: handleEmptyString,*/}
      {/*    },*/}
      {/*    {*/}
      {/*      title: 'Phone Number',*/}
      {/*      dataIndex: 'phoneNumber',*/}
      {/*      render: handleEmptyString,*/}
      {/*    },*/}
      {/*    {*/}
      {/*      title: 'Business Name',*/}
      {/*      dataIndex: 'businessName',*/}
      {/*      render: handleEmptyString,*/}
      {/*    },*/}
      {/*    {*/}
      {/*      title: 'Active',*/}
      {/*      dataIndex: 'active',*/}
      {/*      render: (active) =>*/}
      {/*        active ? (*/}
      {/*          <Tag color="green">Active</Tag>*/}
      {/*        ) : (*/}
      {/*          <Tag color="red">Inactive</Tag>*/}
      {/*        ),*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
    </CanAccess>
  );
}
