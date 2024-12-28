export const vndRevenue = (category) =>
  category.products.reduce((acc, product) => acc + product.totalRevenue, 0);

export const totalSales = (category) =>
  category.products.reduce((acc, product) => acc + product.totalSales, 0);

export const totalSupplierRevenue = (category) =>
  totalSales(category) - vndRevenue(category);
