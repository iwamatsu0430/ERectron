/// <reference path="../../d.ts/node/node.d.ts" />

class DBPlugin {

  types: ColumnType[] = [];

  constructor (dbPluginName: string) {
    this.loadDBPlugin(dbPluginName);
  }

  loadDBPlugin = (dbPluginName: string) => {
    let fs = require("fs");
    let pluginPath: string = `./plugins/${dbPluginName}/type.json`;
    fs.readFile(pluginPath, (error: Error, bytes: number[]) => {
      if (error !== null) {
        return;
      }
      JSON.parse(bytes.toString()).forEach((type: any) => {
        this.types.push(new ColumnType(type.names, type.options));
      });
    });
  }
}

class ColumnType {

  names: string[] = [];
  options: ColumnTypeOptionEnum[] = [];

  mainName = (): String => (this.names.length > 0) ? this.names[0] : "";

  constructor (names: string[], options: string[]) {
    this.names = names;
    options.forEach((option: string) => {
      switch (option) {
        case "unsigned":
          this.options.push(ColumnTypeOptionEnum.Unsigned);
          break;
      }
    });
  }
}
