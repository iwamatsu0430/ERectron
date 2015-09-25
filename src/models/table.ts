class Table {
  name: LogicalPhysicalName
  columns: TableColumn[]

  constructor (name: LogicalPhysicalName, columns: TableColumn[]) {
    this.name = name;
    this.columns = columns;
  }

  static mapping = tableJsons => {
    var tables: Table[] = [];
    tableJsons.forEach(table => {
      var tableColumns: TableColumn[] = [];
      table.columns.forEach(column => {
          tableColumns.push(new TableColumn(new LogicalPhysicalName(column.name.logical, column.name.physical), column.type, column.primary));
      });
      tables.push(new Table(new LogicalPhysicalName(table.name.logical, table.name.physical), tableColumns));
    });
    return tables;
  }
}

class TableColumn {
  name: LogicalPhysicalName
  type: string
  primary: boolean

  constructor (name: LogicalPhysicalName, type: string, primary: boolean) {
    this.name = name;
    this.type = type;
    this.primary = primary;
  }
}
