/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../resources/eventName.ts"/>
/// <reference path="../../utils/viewUtil.ts"/>

@template(ViewUtil.loadView("view/er-canvas/er-setting.html"))
class ErSetting extends Riot.Element {

  isTable: boolean = false;
  isColumn: boolean = false;
  left: number = 0;
  top: number = 0;

  constructor () {
    super();

    window.observable.on(EventName.canvas.showSettingColumn, (params: any) => {
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
