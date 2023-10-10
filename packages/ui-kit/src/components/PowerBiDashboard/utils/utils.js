export const createSlicer = (filters, visualName) => ({
  selector: {
    $schema: 'http://powerbi.com/product/schema#visualSelector',
    visualName,
  },
  state: {
    filters,
  },
});

export const createFilter = (table, column, operator, values) => ({
  $schema: 'http://powerbi.com/product/schema#basic',
  target: {
    table,
    column,
  },
  operator,
  values,
});

export default { createSlicer, createFilter };
