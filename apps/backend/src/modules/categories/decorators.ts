import { VirtualColumn } from 'typeorm';
import { FormatMoney } from 'format-money-js';

export function TotalSales(entity_fk: string) {
  return VirtualColumn({
    type: 'numeric',
    query: (entity) =>
      `SELECT SUM(quantity) FROM order_details WHERE ${entity_fk} = ${entity}._id`,
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
      `SELECT SUM("soldPrice") FROM order_details WHERE ${entity_fk} = ${entity}._id`,
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
function totalSalesQuery(entity_id: string, alias: string) {
  return `SELECT SUM(quantity) FROM order_details WHERE ${entity_id} = ${
    alias + '._id'
  }`;
}

function totalRevenueQuery(entity_id: string, alias: string) {
  return `SELECT SUM("soldPrice") FROM order_details WHERE ${entity_id} = ${
    alias + '._id'
  }`;
}

function formatRevenue(value: number) {
  return new FormatMoney().un(value ?? 0, {
    decimals: 2,
    decimalPoint: '.',
  });
}
