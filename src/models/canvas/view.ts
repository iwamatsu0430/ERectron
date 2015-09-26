class View {

  static mapping = (viewJson: any) => {
    var tableViews: TableView[] = [];
    viewJson.tables.forEach((table: any) => {
      tableViews.push(new TableView(table.name, new XY(table.position.x, table.position.y), table.color));
    });
    var relations: RelationView[] = [];
    viewJson.relations.forEach((relation: any) => {
      relations.push(new RelationView(relation.name, relation.width, relation.color, relation.dasharray));
    });
    return new View(tableViews, relations);
  }

  tables: TableView[];
  relations: RelationView[];

  constructor (tables: TableView[], relations: RelationView[]) {
    this.tables = tables
    this.relations = relations
  }

  findTableView = (tablePhysicalName: string) => {
    var target: TableView = null;
    this.tables.forEach((tv: TableView) => {
      if (tv.name === tablePhysicalName) {
        target = tv;
      }
    });
    return target;
  }

  findRelationView = (tablePhysicalName: string) => {
    var target: RelationView = null;
    this.relations.forEach((rv: RelationView) => {
      if (rv.name === tablePhysicalName) {
        target = rv;
      }
    });
    return target;
  }
}

class TableView {

   name: string
   position: XY
   color: string

   constructor (name: string, position: XY, color: string) {
     this.name = name;
     this.position = position;
     this.color = color;
   }
}

class RelationView {

  name: string
  width: number
  color: string
  dashArray: string

  constructor (name: string, width: number, color: string, dashArray: string) {
    this.name = name;
    this.width = width;
    this.color = color;
    this.dashArray = dashArray;
  }
}
