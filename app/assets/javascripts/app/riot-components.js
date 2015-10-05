/// <reference path="../../d.ts/node/node.d.ts" />
var DBPlugin = (function () {
    function DBPlugin(dbPluginName) {
        var _this = this;
        this.types = [];
        this.loadDBPlugin = function (dbPluginName) {
            var fs = require("fs");
            var pluginPath = "./plugins/" + dbPluginName + "/type.json";
            fs.readFile(pluginPath, function (error, bytes) {
                if (error !== null) {
                    return;
                }
                JSON.parse(bytes.toString()).forEach(function (type) {
                    _this.types.push(new ColumnType(type.names, type.options));
                });
            });
        };
        this.loadDBPlugin(dbPluginName);
    }
    return DBPlugin;
})();
var ColumnType = (function () {
    function ColumnType(names, options) {
        var _this = this;
        this.names = [];
        this.options = [];
        this.mainName = function () { return (_this.names.length > 0) ? _this.names[0] : ""; };
        this.names = names;
        options.forEach(function (option) {
            switch (option) {
                case "unsigned":
                    _this.options.push(ColumnTypeOptionEnum.Unsigned);
                    break;
            }
        });
    }
    return ColumnType;
})();
var LogicalPhysicalNameEnum;
(function (LogicalPhysicalNameEnum) {
    LogicalPhysicalNameEnum[LogicalPhysicalNameEnum["logical"] = 0] = "logical";
    LogicalPhysicalNameEnum[LogicalPhysicalNameEnum["physical"] = 1] = "physical";
})(LogicalPhysicalNameEnum || (LogicalPhysicalNameEnum = {}));
var KeyCodeEnum;
(function (KeyCodeEnum) {
    KeyCodeEnum[KeyCodeEnum["Enter"] = 13] = "Enter";
    KeyCodeEnum[KeyCodeEnum["Shift"] = 16] = "Shift";
    KeyCodeEnum[KeyCodeEnum["Ctrl"] = 17] = "Ctrl";
    KeyCodeEnum[KeyCodeEnum["Alt"] = 18] = "Alt";
    KeyCodeEnum[KeyCodeEnum["Esc"] = 27] = "Esc";
})(KeyCodeEnum || (KeyCodeEnum = {}));
var ColumnTypeOptionEnum;
(function (ColumnTypeOptionEnum) {
    ColumnTypeOptionEnum[ColumnTypeOptionEnum["Unsigned"] = 0] = "Unsigned";
})(ColumnTypeOptionEnum || (ColumnTypeOptionEnum = {}));
var Environment = (function () {
    function Environment() {
    }
    Environment.mapping = function (environmentJson) {
        var environment = new Environment();
        environment.dbPlugin = new DBPlugin(environmentJson.dbPlugin);
        return environment;
    };
    return Environment;
})();
var LogicalPhysicalName = (function () {
    function LogicalPhysicalName(logical, physical) {
        this.logical = logical;
        this.physical = physical;
    }
    return LogicalPhysicalName;
})();
var Relation = (function () {
    function Relation(name, from, to) {
        this.name = name;
        this.from = from;
        this.to = to;
    }
    Relation.mapping = function (relationJson) {
        var relations = [];
        relationJson.forEach(function (relation) {
            var name = new LogicalPhysicalName("", relation.name.physical);
            var fromCardinality = new RelationCardinality(relation.from.min, relation.from.max);
            var from = new RelationTable(relation.from.table, relation.from.column, fromCardinality);
            var toCardinality = new RelationCardinality(relation.to.min, relation.to.max);
            var to = new RelationTable(relation.to.table, relation.to.column, toCardinality);
            relations.push(new Relation(name, from, to));
        });
        return relations;
    };
    return Relation;
})();
var RelationTable = (function () {
    function RelationTable(table, column, cardinality) {
        this.table = table;
        this.column = column;
        this.cardinality = cardinality;
    }
    return RelationTable;
})();
var RelationCardinality = (function () {
    function RelationCardinality(min, max) {
        this.min = min;
        this.max = max;
    }
    return RelationCardinality;
})();
var Table = (function () {
    function Table(name, columns) {
        this.name = name;
        this.columns = columns;
    }
    Table.mapping = function (tableJsons) {
        var tables = [];
        tableJsons.forEach(function (table) {
            var tableColumns = [];
            table.columns.forEach(function (column) {
                tableColumns.push(new TableColumn(new LogicalPhysicalName(column.name.logical, column.name.physical), column.type, column.primary));
            });
            tables.push(new Table(new LogicalPhysicalName(table.name.logical, table.name.physical), tableColumns));
        });
        return tables;
    };
    return Table;
})();
var TableColumn = (function () {
    function TableColumn(name, type, primary) {
        this.name = name;
        this.type = type;
        this.primary = primary;
    }
    return TableColumn;
})();
var EventName = (function () {
    function EventName() {
    }
    EventName.app = {
        onLoadFile: "onAppLoadFile",
        onKeyDown: "onKeyDown",
        onKeyUp: "onKeyUp"
    };
    EventName.canvas = {
        onColorUpdate: "onColorUpdate",
        onLineUpdate: "onLineUpdate",
        showSettingColumn: "showSettingColumn",
        updateSettingColumn: "updateSettingColumn",
        clickFilterColumn: "clickFilterColumn",
        closeSettingColumn: "closeSettingColumn"
    };
    return EventName;
})();
var ExampleERD = (function () {
    function ExampleERD() {
    }
    ExampleERD.environment = {
        dbPlugin: "mysql"
    };
    ExampleERD.colors = [
        {
            name: "myColor",
            text: {
                header: "#FFFFFF",
                body: "#999999"
            },
            background: {
                header: "#0AA2E4",
                body: "#FFFFFF"
            },
            border: "#0AA2E4"
        },
        {
            name: "myColor2",
            text: {
                header: "#FFFFFF",
                body: "#999999"
            },
            background: {
                header: "#0AA2E4",
                body: "#FFFFFF"
            },
            border: "#0AA2E4"
        },
    ];
    ExampleERD.info = {
        plugin: "mysql"
    };
    ExampleERD.tables = [
        {
            name: {
                logical: "メンバー",
                physical: "member"
            },
            columns: [
                {
                    name: {
                        logical: "メンバーID",
                        physical: "_id"
                    },
                    type: "varchar",
                    primary: true
                },
                {
                    name: {
                        logical: "メールアドレス",
                        physical: "mail"
                    },
                    type: "varchar"
                },
                {
                    name: {
                        logical: "パスワード",
                        physical: "password"
                    },
                    type: "varchar"
                },
                {
                    name: {
                        logical: "確認済フラグ",
                        physical: "confirmed"
                    },
                    type: "boolean"
                }
            ],
        },
        {
            name: {
                logical: "ツイート",
                physical: "tweet"
            },
            columns: [
                {
                    name: {
                        logical: "ツイートID",
                        physical: "_id"
                    }
                },
                {
                    name: {
                        logical: "メンバーID",
                        physical: "memberId"
                    }
                },
                {
                    name: {
                        logical: "シェアコンテンツID",
                        physical: "shareContentsId"
                    }
                },
                {
                    name: {
                        logical: "コメント",
                        physical: "comment"
                    }
                },
                {
                    name: {
                        logical: "削除済みフラグ",
                        physical: "deleted"
                    }
                }
            ],
        },
        {
            name: {
                logical: "ツイート評価",
                physical: "tweetValue"
            },
            columns: [
                {
                    name: {
                        logical: "評価者メンバーID",
                        physical: "valueFromMemberId"
                    }
                },
                {
                    name: {
                        logical: "評価対象者メンバーID",
                        physical: "valueToMemberId"
                    }
                },
                {
                    name: {
                        logical: "評価対象ツイートID",
                        physical: "valueToTweetId"
                    }
                },
                {
                    name: {
                        logical: "評価スコア",
                        physical: "valueScore"
                    }
                }
            ],
        },
        {
            name: {
                logical: "シェアコンテンツ",
                physical: "shareContents"
            },
            columns: [
                {
                    name: {
                        logical: "シェアコンテンツID",
                        physical: "_id"
                    }
                },
                {
                    name: {
                        logical: "URL",
                        physical: "url"
                    }
                },
                {
                    name: {
                        logical: "サムネイル画像URL",
                        physical: "thumbnailUrl"
                    }
                },
                {
                    name: {
                        logical: "コンテンツタイトル",
                        physical: "title"
                    }
                }
            ],
        }
    ];
    ExampleERD.views = {
        tables: [
            {
                name: "member",
                position: {
                    x: 100,
                    y: 100
                },
                color: "myColor"
            },
            {
                name: "tweet",
                position: {
                    x: 200,
                    y: 200
                },
                color: "myColor"
            },
            {
                name: "tweetValue",
                position: {
                    x: 300,
                    y: 300
                },
                color: "myColor"
            },
            {
                name: "tweetValue",
                position: {
                    x: 400,
                    y: 400
                },
                color: "myColor"
            },
            {
                name: "shareContents",
                position: {
                    x: 500,
                    y: 500
                },
                color: "myColor"
            }
        ],
        relations: [
            {
                name: "memberToTweet",
                width: 2,
                color: "#0AA2E4",
                dasharray: "3 3"
            },
            {
                name: "memberToShareContents",
                width: 2,
                color: "#0AA2E4",
                dasharray: "3 3"
            },
            {
                name: "tweetToTweetValue",
                width: 2,
                color: "#0AA2E4",
                dasharray: "3 3"
            },
            {
                name: "tweetToShareContents",
                width: 2,
                color: "#0AA2E4",
                dasharray: "3 3"
            },
        ]
    };
    ExampleERD.relations = [
        {
            name: {
                physical: "memberToTweet"
            },
            from: {
                table: "member",
                column: "_id",
                cardinality: {
                    min: 1,
                    max: 1
                }
            },
            to: {
                table: "tweet",
                column: "memberId",
                cardinality: {
                    min: 0,
                    max: 2
                }
            },
            style: {
                width: 2,
                color: "#0AA2E4",
                dasharray: "3 3"
            }
        },
        {
            name: {
                physical: "memberToShareContents"
            },
            from: {
                table: "member",
                column: "_id",
                cardinality: {
                    min: 1,
                    max: 1
                }
            },
            to: {
                table: "shareContents",
                column: "_id",
                cardinality: {
                    min: 0,
                    max: 2
                }
            },
            style: {
                width: 2,
                color: "#0AA2E4",
                dasharray: "3 3"
            }
        },
        {
            name: {
                physical: "tweetToTweetValue"
            },
            from: {
                table: "tweet",
                column: "_id",
                cardinality: {
                    min: 1,
                    max: 1
                }
            },
            to: {
                table: "tweetValue",
                column: "tweetId",
                cardinality: {
                    min: 0,
                    max: 2
                }
            },
            style: {
                width: 2,
                color: "#0AA2E4",
                dasharray: "3 3"
            }
        },
        {
            name: {
                physical: "tweetToShareContents"
            },
            from: {
                table: "tweet",
                column: "_id",
                cardinality: {
                    min: 1,
                    max: 1
                }
            },
            to: {
                table: "shareContents",
                column: "_id",
                cardinality: {
                    min: 0,
                    max: 2
                }
            },
            style: {
                width: 2,
                color: "#0AA2E4",
                dasharray: "3 3"
            }
        }
    ];
    return ExampleERD;
})();
var ViewUtil = (function () {
    function ViewUtil() {
    }
    ViewUtil.loadView = function (path) {
        var fs = require("fs");
        var source = fs.readFileSync(path).toString();
        return source;
    };
    return ViewUtil;
})();
var Color = (function () {
    function Color(name, text, background, border) {
        this.name = name;
        this.text = text;
        this.background = background;
        this.border = border;
    }
    Color.mapping = function (colorJson) {
        var colors = [];
        colorJson.forEach(function (color) {
            var text = new HeaderBodyColor(color.text.header, color.text.body);
            var background = new HeaderBodyColor(color.background.header, color.background.body);
            ;
            colors.push(new Color(color.name, text, background, color.border));
        });
        return colors;
    };
    return Color;
})();
var HeaderBodyColor = (function () {
    function HeaderBodyColor(header, body) {
        this.header = header;
        this.body = body;
    }
    return HeaderBodyColor;
})();
var MouseState = (function () {
    function MouseState() {
        this.isClick = false;
        this.target = null;
        this.offset = new XY(0, 0);
    }
    return MouseState;
})();
var View = (function () {
    function View(tables, relations) {
        var _this = this;
        this.findTableView = function (tablePhysicalName) {
            var target = null;
            _this.tables.forEach(function (tv) {
                if (tv.name === tablePhysicalName) {
                    target = tv;
                }
            });
            return target;
        };
        this.findRelationView = function (tablePhysicalName) {
            var target = null;
            _this.relations.forEach(function (rv) {
                if (rv.name === tablePhysicalName) {
                    target = rv;
                }
            });
            return target;
        };
        this.tables = tables;
        this.relations = relations;
    }
    View.mapping = function (viewJson) {
        var tableViews = [];
        viewJson.tables.forEach(function (table) {
            tableViews.push(new TableView(table.name, new XY(table.position.x, table.position.y), table.color));
        });
        var relations = [];
        viewJson.relations.forEach(function (relation) {
            relations.push(new RelationView(relation.name, relation.width, relation.color, relation.dasharray));
        });
        return new View(tableViews, relations);
    };
    return View;
})();
var TableView = (function () {
    function TableView(name, position, color) {
        this.name = name;
        this.position = position;
        this.color = color;
    }
    return TableView;
})();
var RelationView = (function () {
    function RelationView(name, width, color, dashArray) {
        this.name = name;
        this.width = width;
        this.color = color;
        this.dashArray = dashArray;
    }
    return RelationView;
})();
var XY = (function () {
    function XY(x, y) {
        this.x = x;
        this.y = y;
    }
    return XY;
})();
/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../../d.ts/github-electron/github-electron.d.ts" />
/// <reference path="../../resources/eventName.ts"/>
/// <reference path="../../utils/viewUtil.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var fs = require('fs');
var remote = require('remote');
var dialog = remote.require('dialog');
var language = "en";
var ErApp = (function (_super) {
    __extends(ErApp, _super);
    function ErApp(opts) {
        var _this = this;
        _super.call(this);
        this.isFileOpen = false;
        this.onDragOver = function (e) { return e.preventDefault(); };
        this.onDragLeave = function (e) { return e.preventDefault(); };
        this.onDrop = function (e) {
            e.preventDefault();
            var filePath = e.dataTransfer.files[0];
        };
        document.ondragover = function (e) { return e.preventDefault(); };
        document.ondrop = function (e) { return e.preventDefault(); };
        window.observable = new Riot.Observable();
        window.observable.on(EventName.app.onLoadFile, function () {
            _this.isFileOpen = true;
            _this.update();
        });
    }
    ErApp = __decorate([
        template(ViewUtil.loadView("view/common/er-app.html"))
    ], ErApp);
    return ErApp;
})(Riot.Element);
ErApp.register();
/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../utils/viewUtil.ts"/>
var ErKeyListener = (function (_super) {
    __extends(ErKeyListener, _super);
    function ErKeyListener() {
        _super.call(this);
        window.addEventListener("keydown", function (e) {
            window.observable.trigger(EventName.app.onKeyDown, e.keyCode);
        });
        window.addEventListener("keyup", function (e) {
            window.observable.trigger(EventName.app.onKeyUp, e.keyCode);
        });
    }
    ErKeyListener = __decorate([
        template(ViewUtil.loadView("view/common/er-keylistener.html"))
    ], ErKeyListener);
    return ErKeyListener;
})(Riot.Element);
ErKeyListener.register();
/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../models/declare.ts"/>
/// <reference path="../../resources/eventName.ts"/>
/// <reference path="../../resources/exampleERD.ts"/>
/// <reference path="../../utils/viewUtil.ts"/>
var ErCanvas = (function (_super) {
    __extends(ErCanvas, _super);
    function ErCanvas() {
        var _this = this;
        _super.call(this);
        this.mouseState = new MouseState();
        this.loadContents = function () {
            _this.environment = Environment.mapping(ExampleERD.environment);
            _this.colors = Color.mapping(ExampleERD.colors);
            _this.tables = Table.mapping(ExampleERD.tables);
            _this.view = View.mapping(ExampleERD.views);
            _this.relations = Relation.mapping(ExampleERD.relations);
            window.observable.on(EventName.app.onLoadFile, function (filePath) {
                if (filePath) {
                }
                window.observable.trigger(EventName.canvas.onColorUpdate);
                window.observable.trigger(EventName.canvas.onLineUpdate);
            });
            window.addEventListener("mousemove", function (e) {
                if (_this.mouseState.isClick) {
                    var view = _this.view.findTableView(_this.mouseState.target.name.physical);
                    var position = new XY(e.pageX - _this.mouseState.offset.x, e.pageY - _this.mouseState.offset.y);
                    _this.updateTableView(new TableView(view.name, position, view.color));
                    _this.update();
                    setTimeout(function () { return window.observable.trigger(EventName.canvas.onLineUpdate); }, 10);
                }
            });
            window.addEventListener("mouseup", function (e) {
                _this.mouseState.isClick = false;
                _this.mouseState.target = null;
            });
            window.observable.on(EventName.canvas.onColorUpdate, function () {
                _this.colors.forEach(function (color) {
                    _this.update();
                    var target = _this.root.querySelector(".pg-canvas-table-style-" + color.name);
                    if (target.hasChildNodes("style")) {
                        var style = document.createElement("style");
                        target.appendChild(style);
                    }
                    _this.root.querySelector(".pg-canvas-table-style-" + color.name + " style").innerHTML = _this.renderCSS(color);
                });
            });
            window.observable.on(EventName.canvas.onLineUpdate, function () {
                _this.relations.forEach(function (relation) {
                    _this.update();
                    _this.renderRelation(relation);
                });
            });
            window.observable.on(EventName.canvas.updateSettingColumn, function () {
                _this.update();
            });
        };
        this.onMouseDownTable = function (e) {
            _this.mouseState.isClick = true;
            _this.mouseState.target = e.item;
            _this.mouseState.offset.x = e.offsetX;
            _this.mouseState.offset.y = e.offsetY;
        };
        this.onClickColumnLogical = function (e) {
            window.observable.trigger(EventName.canvas.showSettingColumn, { item: e.item, position: new XY(e.x, e.y), target: LogicalPhysicalNameEnum.logical });
        };
        this.onClickColumnPhysical = function (e) {
            window.observable.trigger(EventName.canvas.showSettingColumn, { item: e.item, position: new XY(e.x, e.y), target: LogicalPhysicalNameEnum.physical });
        };
        this.renderCSS = function (parent) {
            return "\n    .pg-canvas-table-color-" + parent.name + " {\n      border-color: " + parent.border + " !important;\n    }\n    .pg-canvas-table-color-" + parent.name + " header {\n      background: " + parent.background.header + ";\n      color: " + parent.text.header + ";\n      border-color: " + parent.border + ";\n    }\n    .pg-canvas-table-color-" + parent.name + " main {\n      background: " + parent.background.body + ";\n      color: " + parent.text.body + ";\n    }";
        };
        this.renderRelation = function (relation) {
            var line = _this.root.querySelector(".pg-canvas-svg-style-" + relation.name.physical);
            var fromTable = _this.findTableByPhysicalName(relation.from.table);
            var toTable = _this.findTableByPhysicalName(relation.to.table);
            if (fromTable == null || toTable == null) {
                return;
            }
            var fromPosition = _this.findPosition(fromTable.name.physical);
            var toPosition = _this.findPosition(toTable.name.physical);
            var fromElement = _this.root.querySelector('section[name="table-' + fromTable.name.physical + '"]');
            var toElement = _this.root.querySelector('section[name="table-' + toTable.name.physical + '"]');
            line.setAttribute("x1", (fromPosition.x + fromElement.offsetWidth / 2).toString());
            line.setAttribute("y1", (fromPosition.y + fromElement.offsetHeight / 2).toString());
            line.setAttribute("x2", (toPosition.x + toElement.offsetWidth / 2).toString());
            line.setAttribute("y2", (toPosition.y + toElement.offsetHeight / 2).toString());
            var relationView = _this.view.findRelationView(relation.name.physical);
            line.setAttribute("stroke", relationView.color);
            line.setAttribute("stroke-width", relationView.width + "px");
            if (relationView.dashArray) {
                line.setAttribute("stroke-dasharray", relationView.dashArray);
            }
        };
        this.findTableByPhysicalName = function (tablePhysicalName) {
            var target = null;
            _this.tables.forEach(function (table) {
                if (table.name.physical === tablePhysicalName) {
                    target = table;
                }
            });
            return target;
        };
        this.findPosition = function (tablePhysicalName) {
            var view = _this.view.findTableView(tablePhysicalName);
            if (view) {
                return new XY(view.position.x, view.position.y);
            }
            else {
                return new XY(0, 0);
            }
        };
        this.findColor = function (tablePhysicalName) {
            var view = _this.view.findTableView(tablePhysicalName);
            if (view) {
                return view.color;
            }
            else {
                return null;
            }
        };
        this.updateTableView = function (tableView) {
            var tableViews = [];
            _this.view.tables.forEach(function (tv) {
                if (tableView.name === tv.name) {
                    tableViews.push(tableView);
                }
                else {
                    tableViews.push(tv);
                }
            });
            _this.view = new View(tableViews, _this.view.relations);
        };
        this.updateRelationView = function (relationView) {
            var relationViews = [];
            _this.view.relations.forEach(function (rv) {
                if (relationView.name === rv.name) {
                    relationViews.push(relationView);
                }
                else {
                    relationViews.push(rv);
                }
            });
            _this.view = new View(_this.view.tables, relationViews);
        };
        this.loadContents();
    }
    ErCanvas = __decorate([
        template(ViewUtil.loadView("view/er-canvas/er-canvas.html"))
    ], ErCanvas);
    return ErCanvas;
})(Riot.Element);
ErCanvas.register();
/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../utils/viewUtil.ts"/>
var ErSettingColumn = (function (_super) {
    __extends(ErSettingColumn, _super);
    function ErSettingColumn() {
        var _this = this;
        _super.call(this);
        this.onInputLogicalName = function (e) {
            _this.nameItem.logical = _this.logicalName.value;
            window.observable.trigger(EventName.canvas.updateSettingColumn);
        };
        this.onInputPhysicalName = function (e) {
            _this.nameItem.physical = _this.physicalName.value;
            window.observable.trigger(EventName.canvas.updateSettingColumn);
        };
        this.findInvalidItem = function () {
            var logical = _this.logicalName.value;
            var physical = _this.physicalName.value;
            var items = [];
            if (logical === "") {
                items.push(LogicalPhysicalNameEnum.logical);
            }
            if (physical === "") {
                items.push(LogicalPhysicalNameEnum.physical);
            }
            return items;
        };
        this.close = function () {
            var invalidItems = _this.findInvalidItem();
            if (invalidItems.length > 0) {
                if (!confirm("Cannot save " + invalidItems.join(", ") + " value. Do you want to close column setting window?")) {
                    return;
                }
                if (invalidItems.indexOf(LogicalPhysicalNameEnum.physical) >= 0) {
                    _this.nameItem.physical = _this.initial.physical;
                }
                if (invalidItems.indexOf(LogicalPhysicalNameEnum.logical) >= 0) {
                    _this.nameItem.logical = _this.initial.logical;
                }
            }
            window.observable.trigger(EventName.canvas.closeSettingColumn);
            window.observable.trigger(EventName.canvas.updateSettingColumn);
        };
        window.observable.on(EventName.canvas.showSettingColumn, function (params) {
            _this.logicalName.value = params.item.name.logical;
            _this.physicalName.value = params.item.name.physical;
            _this.initial = new LogicalPhysicalName(_this.logicalName.value, _this.physicalName.value);
            _this.nameItem = params.item.name;
            switch (params.target) {
                case LogicalPhysicalNameEnum.logical:
                    _this.logicalName.focus();
                    break;
                case LogicalPhysicalNameEnum.physical:
                    _this.physicalName.focus();
                    break;
            }
        });
        window.observable.on(EventName.app.onKeyDown, function (keyCode) {
            if (_this.root.className !== "show") {
                return;
            }
            switch (keyCode) {
                case KeyCodeEnum.Esc:
                    _this.close();
                    break;
            }
        });
        window.observable.on(EventName.canvas.clickFilterColumn, function () {
            _this.close();
        });
    }
    ErSettingColumn = __decorate([
        template(ViewUtil.loadView("view/er-canvas/er-setting-column.html"))
    ], ErSettingColumn);
    return ErSettingColumn;
})(Riot.Element);
ErSettingColumn.register();
/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../utils/viewUtil.ts"/>
var ErSettingTable = (function (_super) {
    __extends(ErSettingTable, _super);
    function ErSettingTable() {
        _super.apply(this, arguments);
    }
    ErSettingTable = __decorate([
        template(ViewUtil.loadView("view/er-canvas/er-setting-table.html"))
    ], ErSettingTable);
    return ErSettingTable;
})(Riot.Element);
ErSettingTable.register();
/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../resources/eventName.ts"/>
/// <reference path="../../utils/viewUtil.ts"/>
var ErSetting = (function (_super) {
    __extends(ErSetting, _super);
    function ErSetting() {
        var _this = this;
        _super.call(this);
        this.isTable = false;
        this.isColumn = false;
        this.left = 0;
        this.top = 0;
        this.onClickFilterTable = function (e) {
        };
        this.onClickFilterColumn = function (e) {
            window.observable.trigger(EventName.canvas.clickFilterColumn);
        };
        window.observable.on(EventName.canvas.showSettingColumn, function (params) {
            _this.isColumn = true;
            _this.left = params.position.x;
            _this.top = params.position.y + 10;
            _this.update();
        });
        window.observable.on(EventName.canvas.closeSettingColumn, function () {
            _this.isColumn = false;
            _this.left = 0;
            _this.top = 0;
            _this.update();
        });
    }
    ErSetting = __decorate([
        template(ViewUtil.loadView("view/er-canvas/er-setting.html"))
    ], ErSetting);
    return ErSetting;
})(Riot.Element);
ErSetting.register();
/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../resources/eventName.ts"/>
/// <reference path="../../utils/viewUtil.ts"/>
var ErTop = (function (_super) {
    __extends(ErTop, _super);
    function ErTop() {
        var _this = this;
        _super.call(this);
        this.isOpenHover = false;
        this.onClickOpen = function (e) {
            e.preventDefault();
            return false;
        };
        this.onClickCreate = function (e) {
            e.preventDefault();
            window.observable.trigger(EventName.app.onLoadFile, null);
            return false;
        };
        this.onClickRecent = function (e) {
            e.preventDefault();
            return false;
        };
        this.onMouseOverOpen = function (e) {
            _this.isOpenHover = true;
        };
        this.onMouseOutOpen = function (e) {
            _this.isOpenHover = false;
        };
        document.addEventListener("selectstart", function (e) { return e.preventDefault(); });
    }
    ErTop = __decorate([
        template(ViewUtil.loadView("view/er-top/er-top.html"))
    ], ErTop);
    return ErTop;
})(Riot.Element);
ErTop.register();
