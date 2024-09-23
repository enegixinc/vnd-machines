'use client';

import React from 'react';
import { QuickTableSection } from '@components/quick-table-section';
import { CanAccess } from '@refinedev/core';
import { supplierColumns } from '@app/suppliers/columns';

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
        columns={supplierColumns}
      />
    </CanAccess>
  );
}
