/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../utils/viewUtil.ts"/>

@template(ViewUtil.loadView("er-canvas/er-canvas-table.html"))
class ErCanvasTable extends Riot.Element {

  mouseState: MouseState = new MouseState();
  tables: Table[];

  onMouseDownTable = (e: MouseEvent) => {
    this.mouseState.isClick = true;
    this.mouseState.target = e.item;
    this.mouseState.offset.x = e.offsetX;
    this.mouseState.offset.y = e.offsetY;
  }
}

ErCanvasTable.register();
