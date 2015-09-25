/// <reference path="../../bower_components/riot-ts/riot-ts.d.ts" />

enum Item {
  physicalName,
  logicalName
}

var itemPhysical = Item[0];
var itemLogical = Item[1];

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

  nameItem

  logicalName
  physicalName

  initialLogicalName
  initialPhysicalName

  constructor() {
    super();

    window.observable.on(EventName.canvas.showSettingColumn, params => {
      this.logicalName.value = params.item.name.logical;
      this.physicalName.value = params.item.name.physical;
      this.initialLogicalName = params.item.name.logical;
      this.initialPhysicalName = params.item.name.physical;
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
        if (invalidItems.indexOf(itemPhysical) >= 0) {
          this.nameItem.physical = this.initialPhysicalName;
        }
        if (invalidItems.indexOf(itemLogical) >= 0) {
          this.nameItem.logical = this.initialLogicalName;
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
    var logical = this.logicalName.value;
    var physical = this.physicalName.value;
    var items = [];
    if (logical == "") {
      items.push(itemLogical);
    }
    if (physical == "") {
      items.push(itemPhysical);
    }
    return items;
  }
}

ErSettingColumn.register();
