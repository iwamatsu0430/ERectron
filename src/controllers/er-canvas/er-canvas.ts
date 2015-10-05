/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../models/declare.ts"/>
/// <reference path="../../resources/eventName.ts"/>
/// <reference path="../../resources/exampleERD.ts"/>
/// <reference path="../../utils/viewUtil.ts"/>

@template(ViewUtil.loadView("view/er-canvas/er-canvas.html"))
class ErCanvas extends Riot.Element {

  environment: Environment;
  colors: Color[];
  tables: Table[];
  view: View;
  relations: Relation[];
  mouseState: MouseState = new MouseState();

  constructor () {
    super();
    this.loadContents();
  }

  loadContents = () => {
    this.environment = Environment.mapping(ExampleERD.environment);
    this.colors = Color.mapping(ExampleERD.colors);
    this.tables = Table.mapping(ExampleERD.tables);
    this.view = View.mapping(ExampleERD.views);
    this.relations = Relation.mapping(ExampleERD.relations);

    window.observable.on(EventName.app.onLoadFile, (filePath: string) => {
      if (filePath) {
        // TODO load file
      }

      window.observable.trigger(EventName.canvas.onColorUpdate);
      window.observable.trigger(EventName.canvas.onLineUpdate);
    });

    window.addEventListener("mousemove", (e: MouseEvent) => {
      if (this.mouseState.isClick) {
        var view = this.view.findTableView(this.mouseState.target.name.physical);
        var position = new XY(e.pageX - this.mouseState.offset.x, e.pageY - this.mouseState.offset.y);
        this.updateTableView(new TableView(view.name, position, view.color));
        this.update();
        setTimeout(() => window.observable.trigger(EventName.canvas.onLineUpdate), 10);
      }
    });

    window.addEventListener("mouseup", (e: MouseEvent) => {
      this.mouseState.isClick = false;
      this.mouseState.target = null;
    });

    window.observable.on(EventName.canvas.onColorUpdate, () => {
      this.colors.forEach(color => {
        this.update();
        var target = this.root.querySelector(".pg-canvas-table-style-" + color.name);
        if (target.hasChildNodes("style")) {
          var style = document.createElement("style");
          target.appendChild(style);
        }
        this.root.querySelector(".pg-canvas-table-style-" + color.name + " style").innerHTML = this.renderCSS(color);
      });
    });

    window.observable.on(EventName.canvas.onLineUpdate, () => {
      this.relations.forEach(relation => {
        this.update();
        this.renderRelation(relation);
      });
    });

    window.observable.on(EventName.canvas.updateSettingColumn, () => {
      this.update();
    });
  }

  onMouseDownTable = (e: MouseEvent) => {
    this.mouseState.isClick = true;
    this.mouseState.target = e.item;
    this.mouseState.offset.x = e.offsetX;
    this.mouseState.offset.y = e.offsetY;
  }

  onClickColumnLogical = (e: MouseEvent) => {
    window.observable.trigger(EventName.canvas.showSettingColumn, {item: e.item, position: new XY(e.x, e.y), target: LogicalPhysicalNameEnum.logical});
  }

  onClickColumnPhysical = (e: MouseEvent) => {
    window.observable.trigger(EventName.canvas.showSettingColumn, {item: e.item, position: new XY(e.x, e.y), target: LogicalPhysicalNameEnum.physical});
  }

  renderCSS = (parent: Color) => {
    return `
    .pg-canvas-table-color-${parent.name} {
      border-color: ${parent.border} !important;
    }
    .pg-canvas-table-color-${parent.name} header {
      background: ${parent.background.header};
      color: ${parent.text.header};
      border-color: ${parent.border};
    }
    .pg-canvas-table-color-${parent.name} main {
      background: ${parent.background.body};
      color: ${parent.text.body};
    }`;
  }

  renderRelation = (relation: Relation) => {
    var line: Element = this.root.querySelector(".pg-canvas-svg-style-" + relation.name.physical);
    var fromTable: Table = this.findTableByPhysicalName(relation.from.table);
    var toTable: Table = this.findTableByPhysicalName(relation.to.table);
    if (fromTable == null || toTable == null) {
      return;
    }

    var fromPosition: XY = this.findPosition(fromTable.name.physical);
    var toPosition: XY = this.findPosition(toTable.name.physical);
    var fromElement: Element = this.root.querySelector('section[name="table-' + fromTable.name.physical + '"]');
    var toElement: Element = this.root.querySelector('section[name="table-' + toTable.name.physical + '"]');

    line.setAttribute("x1", (fromPosition.x + fromElement.offsetWidth / 2).toString());
    line.setAttribute("y1", (fromPosition.y + fromElement.offsetHeight / 2).toString());
    line.setAttribute("x2", (toPosition.x + toElement.offsetWidth / 2).toString());
    line.setAttribute("y2", (toPosition.y + toElement.offsetHeight / 2).toString());
    var relationView: RelationView = this.view.findRelationView(relation.name.physical);
    line.setAttribute("stroke", relationView.color);
    line.setAttribute("stroke-width", relationView.width + "px");
    if (relationView.dashArray) {
      line.setAttribute("stroke-dasharray", relationView.dashArray);
    }
  }

  findTableByPhysicalName = (tablePhysicalName: string) => {
    var target: Table = null;
    this.tables.forEach(table => {
      if (table.name.physical === tablePhysicalName) {
        target = table;
      }
    });
    return target;
  }

  findPosition = (tablePhysicalName: string) => {
    var view: TableView = this.view.findTableView(tablePhysicalName);
    if (view) {
      return new XY(view.position.x, view.position.y);
    } else {
      return new XY(0, 0);
    }
  }

  findColor = (tablePhysicalName: string) => {
    var view: TableView = this.view.findTableView(tablePhysicalName);
    if (view) {
      return view.color;
    } else {
      return null;
    }
  }

  updateTableView = (tableView: TableView) => {
    var tableViews: TableView[] = [];
    this.view.tables.forEach((tv: TableView) => {
        if (tableView.name === tv.name) {
          tableViews.push(tableView);
        } else {
          tableViews.push(tv);
        }
    });
    this.view = new View(tableViews, this.view.relations);
  }

  updateRelationView = (relationView: RelationView) => {
    var relationViews: RelationView[] = [];
    this.view.relations.forEach((rv: RelationView) => {
        if (relationView.name === rv.name) {
          relationViews.push(relationView);
        } else {
          relationViews.push(rv);
        }
    });
    this.view = new View(this.view.tables, relationViews);
  }
}

ErCanvas.register();
