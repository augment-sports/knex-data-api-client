function applyRecord(columnMetadata, record) {
  const parsedColumns = {};

  columnMetadata.forEach((column) => {
    // Skip null values
    if (record[column.name]) {
      switch (column.typeName) {
        case 'timestamp':
        case 'timestamptz':
          parsedColumns[column.name] = new Date(record[column.name]);
          break;
        case 'json':
        case 'jsonb':
          parsedColumns[column.name] = JSON.parse(record[column.name]);
          break;
      }
    }
  });

  return {
    ...record,
    ...parsedColumns,
  };
}

function apply({ columnMetadata, records }) {
  return records.map((record) => applyRecord(columnMetadata, record));
}

module.exports = {
  apply,
};
