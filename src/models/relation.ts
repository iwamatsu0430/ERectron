class Relation {
  name: LogicalPhysicalName
  from: RelationTable
  to: RelationTable

  constructor (name: LogicalPhysicalName, from: RelationTable, to: RelationTable) {
    this.name = name;
    this.from = from;
    this.to = to;
  }

  static mapping = relationJson => {
    var relations: Relation[] = [];
    relationJson.forEach(relation => {
      var name: LogicalPhysicalName = new LogicalPhysicalName("", relation.name.physical);
      var fromCardinality = new RelationCardinality(relation.from.min, relation.from.max);
      var from: RelationTable = new RelationTable(relation.from.table, relation.from.column, fromCardinality);
      var toCardinality = new RelationCardinality(relation.to.min, relation.to.max);
      var to: RelationTable = new RelationTable(relation.to.table, relation.to.column, toCardinality);
      relations.push(new Relation(name, from, to));
    });
    return relations;
  }
}

class RelationTable {
  table: string
  column: string
  cardinality: RelationCardinality

  constructor (table: string, column: string, cardinality: RelationCardinality) {
    this.table = table;
    this.column = column;
    this.cardinality = cardinality;
  }
}

class RelationCardinality {
  min: number
  max: number

  constructor (min: number, max: number) {
    this.min = min;
    this.max = max;
  }
}
