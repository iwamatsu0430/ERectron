var EventName = (function () {
    function EventName() {
    }
    EventName.app = {
        onLoadFile: "onAppLoadFile"
    };
    EventName.canvas = {
        onColorUpdate: "onColorUpdate",
        onLineUpdate: "onLineUpdate"
    };
    return EventName;
})();
/// <reference path="../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../d.ts/github-electron/github-electron.d.ts" />
/// <reference path="./resource/eventName.ts"/>
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
var App = (function (_super) {
    __extends(App, _super);
    function App(opts) {
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
    App = __decorate([
        template('\
<app>\
  <div class="sg-container" ondragover={onDragOver} ondragleave={onDragLeave} ondrop={onDrop}>\
    <er-top class={pg-top-display: !isFileOpen}></er-top>\
    <er-canvas class={pg-canvas-display: isFileOpen}></er-canvas>\
  </div>\
</app>')
    ], App);
    return App;
})(Riot.Element);
App.register();
var ExampleERD = (function () {
    function ExampleERD() {
    }
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
                    }
                },
                {
                    name: {
                        logical: "メールアドレス",
                        physical: "mail"
                    }
                },
                {
                    name: {
                        logical: "パスワード",
                        physical: "password"
                    }
                },
                {
                    name: {
                        logical: "確認済フラグ",
                        physical: "confirmed"
                    }
                }
            ],
            color: "myColor",
            position: {
                x: 100,
                y: 100
            }
        },
        {
            name: {
                logical: "ツイート",
                physical: "tweet"
            },
            color: "myColor",
            position: {
                x: 300,
                y: 100
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
            ]
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
            color: "myColor",
            position: {
                x: 100,
                y: 100
            }
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
            color: "myColor",
            position: {
                x: 100,
                y: 100
            }
        }
    ];
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
/// <reference path="../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../resource/eventName.ts"/>
/// <reference path="../resource/exampleERD.ts"/>
var ErCanvas = (function (_super) {
    __extends(ErCanvas, _super);
    function ErCanvas() {
        var _this = this;
        _super.call(this);
        this.global = {};
        this.tables = [];
        this.relations = [];
        this.mouse = {
            isClick: false,
            target: null,
            offset: {
                x: 0,
                y: 0
            }
        };
        this.onMouseDownTable = function (e) {
            _this.mouse.isClick = true;
            _this.mouse.target = e.item;
            _this.mouse.offset.x = e.offsetX;
            _this.mouse.offset.y = e.offsetY;
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
            var fromElement = _this.root.querySelector('section[name="table-' + fromTable.name.physical + '"]');
            var toElement = _this.root.querySelector('section[name="table-' + toTable.name.physical + '"]');
            line.setAttribute("x1", (fromTable.position.x + fromElement.offsetWidth / 2).toString());
            line.setAttribute("y1", (fromTable.position.y + fromElement.offsetHeight / 2).toString());
            line.setAttribute("x2", (toTable.position.x + toElement.offsetWidth / 2).toString());
            line.setAttribute("y2", (toTable.position.y + toElement.offsetHeight / 2).toString());
            line.setAttribute("stroke", relation.style.color);
            line.setAttribute("stroke-width", relation.style.width);
            if (relation.style.dasharray) {
                line.setAttribute("stroke-dasharray", relation.style.dasharray);
            }
        };
        this.findTableByPhysicalName = function (tablePhysicalName) {
            var targetTable = null;
            _this.tables.forEach(function (table) {
                if (table.name.physical == tablePhysicalName) {
                    targetTable = table;
                }
            });
            return targetTable;
        };
        this.global = {
            colors: ExampleERD.colors
        };
        this.tables = ExampleERD.tables;
        this.relations = ExampleERD.relations;
        window.observable.on(EventName.app.onLoadFile, function (filePath) {
            if (filePath) {
            }
        });
        window.addEventListener("mousemove", function (e) {
            if (_this.mouse.isClick) {
                _this.mouse.target.position.x = e.pageX - _this.mouse.offset.x;
                _this.mouse.target.position.y = e.pageY - _this.mouse.offset.y;
                _this.update();
                setTimeout(function () { return window.observable.trigger(EventName.canvas.onLineUpdate); }, 10);
            }
        });
        window.addEventListener("mouseup", function (e) {
            _this.mouse.isClick = false;
            _this.mouse.target = null;
        });
        window.observable.on(EventName.canvas.onColorUpdate, function () {
            _this.global["colors"].forEach(function (color) {
                _this.update();
                _this.root.querySelector(".pg-canvas-table-style-" + color.name).innerHTML = _this.renderCSS(color);
            });
        });
        window.observable.on(EventName.canvas.onLineUpdate, function () {
            _this.relations.forEach(function (relation) {
                _this.update();
                _this.renderRelation(relation);
            });
        });
        this.on("mount", function () {
            window.observable.trigger(EventName.canvas.onColorUpdate);
            window.observable.trigger(EventName.canvas.onLineUpdate);
        });
    }
    ErCanvas = __decorate([
        template('\
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
                <h2>\
                  <span>{name.logical}</span>\
                  <span if={name.logical && name.physical}> / </span>\
                  <span>{name.physical}</span>\
                </h2>\
              </li>\
            </ul>\
          </main>\
          <footer>\
          </footer>\
        </section>\
      </div>\
    </div>\
    <div><!-- menu -->\
    </div>\
  </main>\
  <section each={global.colors}>\
    <style class="pg-canvas-table-style-{name}"></style>\
  </section>\
</er-canvas>')
    ], ErCanvas);
    return ErCanvas;
})(Riot.Element);
ErCanvas.register();
/// <reference path="../../bower_components/riot-ts/riot-ts.d.ts" />
var ErSettingColumn = (function (_super) {
    __extends(ErSettingColumn, _super);
    function ErSettingColumn() {
        _super.apply(this, arguments);
    }
    ErSettingColumn = __decorate([
        template('\
<er-setting-column>\
</er-setting-column>\
')
    ], ErSettingColumn);
    return ErSettingColumn;
})(Riot.Element);
ErSettingColumn.register();
/// <reference path="../../bower_components/riot-ts/riot-ts.d.ts" />
var ErSettingTable = (function (_super) {
    __extends(ErSettingTable, _super);
    function ErSettingTable() {
        _super.apply(this, arguments);
    }
    ErSettingTable = __decorate([
        template('\
<er-setting-table>\
</er-setting-table>\
')
    ], ErSettingTable);
    return ErSettingTable;
})(Riot.Element);
ErSettingTable.register();
/// <reference path="../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../resource/eventName.ts"/>
var ErTop = (function (_super) {
    __extends(ErTop, _super);
    function ErTop() {
        var _this = this;
        _super.call(this);
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
        this.isOpenHover = false;
        this.onMouseOverOpen = function (e) {
            _this.isOpenHover = true;
        };
        this.onMouseOutOpen = function (e) {
            _this.isOpenHover = false;
        };
        document.addEventListener("selectstart", function (e) { return e.preventDefault(); });
    }
    ErTop = __decorate([
        template('\
<er-top>\
  <title>ERectron</title>\
  <main class="pg-main-top">\
    <header>\
      <h1>ERectron</h1>\
    </header>\
    <ul>\
      <li>\
        <h2 class="pg-main-top-open">\
          <a href="/open" onclick={onClickOpen} onmouseover={onMouseOverOpen} onmouseout={onMouseOutOpen}>\
            <i class="fa fa-folder {pg-main-top-open-show: !isOpenHover}"></i>\
            <i class="fa fa-folder-open {pg-main-top-open-show: isOpenHover}"></i>\
            Open ERD\
          </a>\
        </h2>\
      </li>\
      <li>\
        <h2 class="pg-main-top-create">\
          <a href="/create" onclick={onClickCreate}>\
            <i class="fa fa-file"></i> Create ERD\
          </a>\
        </h2>\
      </li>\
      <li>\
        <h2 class="pg-main-top-recent">\
          <a href="/recent" onclick={onClickRecent}>\
            <i class="fa fa-history"></i> Open Recent\
          </a>\
        </h2>\
      </li>\
    </ul>\
    <footer>\
      <p>(c)2015 SAW APP</p>\
    </footer>\
  </main>\
</er-top>')
    ], ErTop);
    return ErTop;
})(Riot.Element);
ErTop.register();
