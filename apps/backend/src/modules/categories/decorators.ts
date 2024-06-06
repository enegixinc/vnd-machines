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

function formatRevenue(value: number) {
  return new FormatMoney().un(value ?? 0, {
    decimals: 2,
    decimalPoint: '.',
  });
}
