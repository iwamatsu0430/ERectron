/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../utils/viewUtil.ts"/>

@template(ViewUtil.loadView("view/er-canvas/er-setting-column.html"))
class ErSettingColumn extends Riot.Element {

  nameItem: LogicalPhysicalName;
  initial: LogicalPhysicalName;
  logicalName: HTMLInputElement;
  physicalName: HTMLInputElement;

  constructor () {
    super();

    window.observable.on(EventName.canvas.showSettingColumn, (params: {item: any; position: XY; target: LogicalPhysicalNameEnum}) => {
      this.logicalName.value = params.item.name.logical;
      this.physicalName.value = params.item.name.physical;
      this.initial = new LogicalPhysicalName(this.logicalName.value, this.physicalName.value);
      this.nameItem = params.item.name;
      switch (params.target) {
        case LogicalPhysicalNameEnum.logical:
          this.logicalName.focus();
          break;
        case LogicalPhysicalNameEnum.physical:
          this.physicalName.focus();
          break;
      }
    });

    window.observable.on(EventName.app.onKeyDown, (keyCode: KeyCodeEnum) => {
      if (this.root.className !== "show") {
        return;
      }
      switch(keyCode) {
        case KeyCodeEnum.Esc:
          this.close();
          break;
      }
    })

    window.observable.on(EventName.canvas.clickFilterColumn, () => {
      this.close();
    });
  }

  onInputLogicalName = (e: KeyboardEvent) => {
    this.nameItem.logical = this.logicalName.value;
    window.observable.trigger(EventName.canvas.updateSettingColumn);
  };

  onInputPhysicalName = (e: KeyboardEvent) => {
    this.nameItem.physical = this.physicalName.value;
    window.observable.trigger(EventName.canvas.updateSettingColumn);
  };

  findInvalidItem = () => {
    var logical: string = this.logicalName.value;
    var physical: string = this.physicalName.value;
    var items: LogicalPhysicalNameEnum[] = [];
    if (logical === "") {
      items.push(LogicalPhysicalNameEnum.logical);
    }
    if (physical === "") {
      items.push(LogicalPhysicalNameEnum.physical);
    }
    return items;
  }

  close = () => {
    var invalidItems: LogicalPhysicalNameEnum[] = this.findInvalidItem();
    if (invalidItems.length > 0) {
      if (!confirm(`Cannot save ${invalidItems.join(", ")} value. Do you want to close column setting window?`)) {
        return;
      }
      if (invalidItems.indexOf(LogicalPhysicalNameEnum.physical) >= 0) {
        this.nameItem.physical = this.initial.physical;
      }
      if (invalidItems.indexOf(LogicalPhysicalNameEnum.logical) >= 0) {
        this.nameItem.logical = this.initial.logical;
      }
    }
    window.observable.trigger(EventName.canvas.closeSettingColumn);
    window.observable.trigger(EventName.canvas.updateSettingColumn);
  }
}

ErSettingColumn.register();
