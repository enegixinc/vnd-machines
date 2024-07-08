import { VirtualColumn } from 'typeorm';

export function TotalSoldProducts(relation: string, f_key: string) {
  return VirtualColumn({
    type: 'numeric',
    query: (entity) => `
        SELECT
            COALESCE(SUM(OD.quantity), 0)
        FROM
            ORDERS O
            JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O._ID
            JOIN PRODUCTS P ON P._ID = OD.PRODUCT_ID
            JOIN ${relation} ENTITY ON ENTITY._ID = P.${f_key}
        WHERE
            ENTITY._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  });
}

export function TotalSales(relation: string, f_key: string) {
  return VirtualColumn({
    type: 'numeric',
    query: (entity) => `
        SELECT
            COALESCE(SUM(OD."soldPrice"), 0)
        FROM
            ORDERS O
            JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O._ID
            JOIN PRODUCTS P ON P._ID = OD.PRODUCT_ID
            JOIN ${relation} ENTITY ON ENTITY._ID = P.${f_key}
        WHERE
            ENTITY._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  });
}

export function TotalRevenue(relation: string, f_key: string) {
  return VirtualColumn({
    type: 'numeric',
    query: (entity) => `
        SELECT
          COALESCE(SUM(
                     CASE
                       WHEN C."feeType" = 'fixed' THEN COALESCE(C."feePerSale", 0)
                       WHEN C."feeType" = 'percentage' THEN COALESCE(OD."soldPrice" * (C."feePerSale" / 100), 0)
                       ELSE 0
                       END
                   ), 0)
        FROM
            ORDERS O
            JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O._ID
            JOIN PRODUCTS P ON P._ID = OD.PRODUCT_ID
            JOIN contracts AS C ON C.supplier_id = P.supplier_id
            JOIN ${relation} ENTITY ON ENTITY._ID = P.${f_key}
        WHERE
          C."startDate" <= O."createdAt"
          AND O."createdAt" <= C."endDate"
          AND ENTITY._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  });
}

export function ActiveRevenue(relation: string, f_key: string) {
  return VirtualColumn({
    type: 'numeric',
    query: (entity) => `
        SELECT
          COALESCE(SUM(
                     CASE
                       WHEN C."feeType" = 'fixed' THEN COALESCE(C."feePerSale", 0)
                       WHEN C."feeType" = 'percentage' THEN COALESCE(OD."soldPrice" * (C."feePerSale" / 100), 0)
                       ELSE 0
                       END
                   ), 0)
        FROM
            ORDERS O
            JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O._ID
            JOIN PRODUCTS P ON P._ID = OD.PRODUCT_ID
            JOIN contracts AS C ON C.supplier_id = P.supplier_id
            JOIN ${relation} ENTITY ON ENTITY._ID = P.${f_key}
        WHERE
          C."status" = 'active'
          AND C."startDate" <= O."createdAt"
          AND O."createdAt" <= C."endDate"
          AND ENTITY._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  });
}

export function TotalOrders(relation: string, f_key: string) {
  return VirtualColumn({
    type: 'int',
    query: (entity) => `
        SELECT
            COALESCE(COUNT(*), 0)
        FROM
            ORDERS O
            JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O._ID
            JOIN PRODUCTS P ON P._ID = OD.PRODUCT_ID
            JOIN ${relation} ENTITY ON ENTITY._ID = P.${f_key}
        WHERE
            ENTITY._id = ${entity}._id
    `,
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
