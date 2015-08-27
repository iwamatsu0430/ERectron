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
      <div class="pg-canvas-table" each={tables} style="left: {position.x}px; top: {position.y}px">\
        <section name="table-{name.physical}" class="pg-canvas-table-color-{default: !color}{color}">\
          <header onmousedown={onMouseDownTable}>\
            <h1>{name.logical}<span if={name.logical && name.physical}> / </span>{name.physical}</h1>\
          </header>\
          <main>\
            <ul>\
              <li each={columns}>\
                <h2>{name.logical}<span if={name.logical && name.physical}> / </span>{name.physical}</h2>\
              </li>\
            </ul>\
          </main>\
          <footer>\
          </footer>\
        </section>\
      </div>\
    </div>\
  </main>\
  <section each={global.colors}>\
    <style class="pg-canvas-table-style-{name}"></style>\
  </section>\
</er-canvas>')
class ErCanvas extends Riot.Element
{
  global = {};
  tables = [];
  relations = [];

  mouse = {
    isClick: false,
    target: null,
    offset: {
      x: 0,
      y: 0
    }
  };

  constructor() {
    super();

    this.global = {
      colors: ExampleERD.colors
    };
    this.tables = ExampleERD.tables;
    this.relations = ExampleERD.relations;

    window.observable.on(EventName.app.onLoadFile, (filePath: string) => {
      if (filePath) {
        // TODO load file
      }
    });

    window.addEventListener("mousemove", (e: MouseEvent) => {
      if (this.mouse.isClick) {
        this.mouse.target.position.x = e.pageX - this.mouse.offset.x;
        this.mouse.target.position.y = e.pageY - this.mouse.offset.y;
        this.update();
        setTimeout(() => window.observable.trigger("onLineUpdate"), 10);
      }
    });

    window.addEventListener("mouseup", (e: MouseEvent) => {
      this.mouse.isClick = false;
      this.mouse.target = null;
    });

    window.observable.on("onColorUpdate", () => {
      this.global["colors"].forEach(color => {
        this.update();
        this.root.querySelector(".pg-canvas-table-style-" + color.name).innerHTML = this.renderCSS(color);
      });
    });

    window.observable.on("onLineUpdate", () => {
      this.relations.forEach(relation => {
        this.update();
        this.renderRelation(relation);
      });
    });

    this.on("mount", () => {
      window.observable.trigger("onColorUpdate");
      window.observable.trigger("onLineUpdate");
    });
  }

  onMouseDownTable = (e: MouseEvent) => {
    this.mouse.isClick = true;
    this.mouse.target = e.item;
    this.mouse.offset.x = e.offsetX;
    this.mouse.offset.y = e.offsetY;
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

    var fromElement = this.root.querySelector('section[name="table-' + fromTable.name.physical + '"]');
    var toElement = this.root.querySelector('section[name="table-' + toTable.name.physical + '"]');

    line.setAttribute("x1", (fromTable.position.x + fromElement.offsetWidth / 2).toString());
    line.setAttribute("y1", (fromTable.position.y + fromElement.offsetHeight / 2).toString());
    line.setAttribute("x2", (toTable.position.x + toElement.offsetWidth / 2).toString());
    line.setAttribute("y2", (toTable.position.y + toElement.offsetHeight / 2).toString());
    line.setAttribute("stroke", relation.style.color);
    line.setAttribute("stroke-width", relation.style.width);
    if (relation.style.dasharray) {
      line.setAttribute("stroke-dasharray", relation.style.dasharray);
    }
  }

  findTableByPhysicalName = tablePhysicalName => {
    var targetTable = null;
    this.tables.forEach(table => {
      if (table.name.physical == tablePhysicalName) {
        targetTable = table;
      }
    });
    return targetTable;
  }
}

ErCanvas.register();
