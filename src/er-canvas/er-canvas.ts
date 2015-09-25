/// <reference path="../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../resource/eventName.ts"/>
/// <reference path="../resource/exampleERD.ts"/>

interface Element {
  innerHTML: any;
  offsetWidth: any;
  offsetHeight: any;
}

interface MouseEvent {
  item: any;
}

@template('\
<er-canvas>\
  <main class="pg-main-canvas">\
    <svg each={relations} class="pg-canvas-svg" xmlns="http://www.w3.org/2000/svg">\
      <line class="pg-canvas-svg-style-{name.physical}" />\
    </svg>\
    <div class="pg-canvas-container">\
      <div class="pg-canvas-table" each={tables} style="left: {findPosition(name.physical).x}px; top: {findPosition(name.physical).y}px">\
        <section name="table-{name.physical}" class="pg-canvas-table-color-{default: !findColor(name.physical)}{findColor(name.physical)}">\
          <header onmousedown={onMouseDownTable}>\
            <h1>\
              <span>{name.logical}</span>\
              <span if={name.logical && name.physical}> / </span>\
              <span>{name.physical}</span>\
            </h1>\
          </header>\
          <main>\
            <ul>\
              <li each={columns}>\
                <h2>\
                  <span class="pg-canvas-column-name" onclick={onClickColumnLogical}>{name.logical}</span>\
                  <span if={name.logical && name.physical}> / </span>\
                  <span class="pg-canvas-column-name" onclick={onClickColumnPhysical}>{name.physical}</span>\
                </h2>\
              </li>\
            </ul>\
          </main>\
          <footer>\
          </footer>\
        </section>\
      </div>\
    </div>\
    <er-setting></er-setting>\
  </main>\
  <section each={global.colors}>\
    <style class="pg-canvas-table-style-{name}"></style>\
  </section>\
</er-canvas>')
class ErCanvas extends Riot.Element
{
  global = {};
  tables: Table[];
  view: View;
  relations = [];
  relations2: Relation[];
  mouseState: MouseState = new MouseState();

  constructor() {
    super();

    this.global = {
      colors: ExampleERD.colors
    };
    this.tables = Table.mapping(ExampleERD.tables);
    this.view = View.mapping(ExampleERD.views);
    this.relations = Relation.mapping(ExampleERD.relations);
    // this.relations = ExampleERD.relations;

    window.observable.on(EventName.app.onLoadFile, (filePath: string) => {
      if (filePath) {
        // TODO load file
      }
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
      this.global["colors"].forEach(color => {
        this.update();
        this.root.querySelector(".pg-canvas-table-style-" + color.name).innerHTML = this.renderCSS(color);
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

    this.on("mount", () => {
      window.observable.trigger(EventName.canvas.onColorUpdate);
      window.observable.trigger(EventName.canvas.onLineUpdate);
    });
  }

  onMouseDownTable = (e: MouseEvent) => {
    this.mouseState.isClick = true;
    this.mouseState.target = e.item;
    this.mouseState.offset.x = e.offsetX;
    this.mouseState.offset.y = e.offsetY;
  }

  onClickColumnLogical = (e: MouseEvent) => {
    window.observable.trigger(EventName.canvas.showSettingColumn, {item: e.item, position: {x: e.x, y: e.y}, target: false});
  }

  onClickColumnPhysical = (e: MouseEvent) => {
    window.observable.trigger(EventName.canvas.showSettingColumn, {item: e.item, position: {x: e.x, y: e.y}, target: true});
  }

  renderCSS = parent => {
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

  renderRelation = relation => {
    var line = this.root.querySelector(".pg-canvas-svg-style-" + relation.name.physical);
    var fromTable = this.findTableByPhysicalName(relation.from.table);
    var toTable = this.findTableByPhysicalName(relation.to.table);
    if (fromTable == null || toTable == null) {
      return;
    }

    var fromPosition = this.findPosition(fromTable.name.physical);
    var toPosition = this.findPosition(toTable.name.physical);
    var fromElement = this.root.querySelector('section[name="table-' + fromTable.name.physical + '"]');
    var toElement = this.root.querySelector('section[name="table-' + toTable.name.physical + '"]');

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

  findTableByPhysicalName = tablePhysicalName => {
    var target = null;
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
      return {x: view.position.x, y: view.position.y}
    } else {
      return {x: 0, y: 0};
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

  updateRelationView = relationView => {
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
