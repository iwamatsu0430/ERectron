/// <reference path="../../bower_components/riot-ts/riot-ts.d.ts" />

@template('\
<er-setting-column>\
  <div class="pg-canvas-setting-row">\
    <div>\
      <label>logical name</label>\
      <input type="text" name="logicalName" oninput={onInputLogicalName}>\
    </div>\
    <div>\
      <label>physical name</label>\
      <input type="text" name="physicalName" oninput={onInputPhysicalName}>\
    </div>\
  </div>\
</er-setting-column>\
')
class ErSettingColumn extends Riot.Element {

  nameItem: LogicalPhysicalName;
  initial: LogicalPhysicalName;
  logicalName: any;
  physicalName: any;

  constructor () {
    super();

    window.observable.on(EventName.canvas.showSettingColumn, params => {
      this.logicalName.value = params.item.name.logical;
      this.physicalName.value = params.item.name.physical;
      this.initial = new LogicalPhysicalName(this.logicalName.value, this.physicalName.value);
      this.nameItem = params.item.name;
      if (params.target) {
        this.physicalName.focus();
      } else {
        this.logicalName.focus();
      }
    });

    window.observable.on(EventName.canvas.clickFilterColumn, () => {
      var invalidItems: String[] = this.findInvalidItem();
      if (invalidItems.length > 0) {
        if (!confirm(`Cannot save ${invalidItems.join(", ")} value. Do you want to close column setting window?`)) {
          return;
        }
        if (invalidItems.indexOf("physicalName") >= 0) {
          this.nameItem.physical = this.initial.physical;
        }
        if (invalidItems.indexOf("logicalName") >= 0) {
          this.nameItem.logical = this.initial.logical;
        }
      }
      window.observable.trigger(EventName.canvas.closeSettingColumn);
      window.observable.trigger(EventName.canvas.updateSettingColumn);
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
    var items: string[] = [];
    if (logical == "") {
      items.push("logicalName");
    }
    if (physical == "") {
      items.push("physicalName");
    }
    return items;
  }
}

ErSettingColumn.register();
