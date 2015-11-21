class ViewUtil {

  static loadView = (path: string): string => {
    var fs: any = require("fs");
    var source: string = fs.readFileSync("view/" + path).toString();
    return source;
  }
}
