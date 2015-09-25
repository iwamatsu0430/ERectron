/// <reference path="../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../resource/eventName.ts"/>

@template('\
<er-setting>\
  <div if={isTable} onclick={onClickFilterTable} class="pg-canvas-setting-filter"></div>\
  <er-setting-table></er-setting-table>\
  <div if={isColumn} onclick={onClickFilterColumn} class="pg-canvas-setting-filter"></div>\
  <er-setting-column class={show: isColumn} style="left: {left}px; top: {top}px;"></er-setting-column>\
</er-setting>')
class ErSetting extends Riot.Element
{
  isTable = false;
  isColumn = false;

  left = 0;
  top = 0;

  constructor() {
    super();

    window.observable.on(EventName.canvas.showSettingColumn, params => {
      this.isColumn = true;
      this.left = params.position.x;
      this.top = params.position.y + 10;
      this.update();
    });

    window.observable.on(EventName.canvas.closeSettingColumn, () => {
      this.isColumn = false;
      this.left = 0;
      this.top = 0;
      this.update();
    });
  }

  onClickFilterTable = (e: MouseEvent) => {

  }

  onClickFilterColumn = (e: MouseEvent) => {
    window.observable.trigger(EventName.canvas.clickFilterColumn);
  }
}

ErSetting.register();
