import { VirtualColumn } from 'typeorm';
import { FormatMoney } from 'format-money-js';

export function TotalSales(entity_fk: string) {
  return VirtualColumn({
    type: 'numeric',
    query: (entity) =>
      `SELECT COALESCE(SUM(quantity::int), 0) FROM order_details WHERE ${entity_fk} = ${entity}._id`,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  });
}

export function TotalRevenue(entity_fk: string) {
  return VirtualColumn({
    type: 'numeric',
    query: (entity) =>
      `SELECT COALESCE(SUM("soldPrice")::numeric, 0) FROM order_details WHERE ${entity_fk} = ${entity}._id`,
    transformer: {
      from: (value) =>
        new FormatMoney().un(value ?? 0, {
          decimals: 2,
          decimalPoint: '.',
        }),
      to: (value) => value,
    },
  });
}

export function TotalOrders(entity_fk: string) {
  return VirtualColumn({
    type: 'int',
    query: (entity) =>
      `SELECT COALESCE(COUNT(*), 0) FROM order_details WHERE ${entity_fk} = ${entity}._id`,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  });
}

// SELECT *
// FROM orders o
// JOIN order_details od on od.order_id = o._id
// JOIN products p on p._id = od.product_id
// JOIN users supplier on supplier._id = p.supplier_id
// JOIN contracts c on c.supplier_id = supplier._id
// WHERE c.status = 'active' AND c."startDate" <= o."createdAt" AND o."createdAt" <= c."endDate"
//
// -- LIMIT 1
