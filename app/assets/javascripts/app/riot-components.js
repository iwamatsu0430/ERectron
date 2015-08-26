var EventName = (function () {
    function EventName() {
    }
    EventName.app = {
        onLoadFile: "onAppLoadFile"
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
/// <reference path="../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../resource/eventName.ts"/>
var ErCanvas = (function (_super) {
    __extends(ErCanvas, _super);
    function ErCanvas() {
        _super.call(this);
        this.global = {};
        this.tables = [];
        this.hoge = function () { return "aiueo"; };
        this.getColor = function (name, target) {
            return name + " + " + target;
        };
        this.global = {
            colors: [
                {
                    name: "myColor",
                    text: {
                        table: "#FFFFFF",
                        column: "#999999"
                    },
                    background: "#0AA2E4",
                    border: "#0AA2E4"
                }
            ]
        };
        this.tables = [
            {
                tableName: {
                    logical: "メンバー",
                    physical: "member"
                },
                columns: [
                    {
                        name: {
                            physical: "memberId"
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
                tableName: {
                    physical: "tweet"
                },
                position: {
                    x: 300,
                    y: 100
                }
            },
        ];
        window.observable.on(EventName.app.onLoadFile, function (filePath) {
            if (filePath) {
            }
        });
    }
    ErCanvas = __decorate([
        template('\
<er-canvas>\
  <main class="pg-main-canvas">\
    <div class="pg-canvas-container">\
      <div class="pg-canvas-table" each={tables} style="left: {position.x}px; top: {position.y}px">\
        <section class="pg-canvas-table-color-{color}">\
          <header>\
            <h1>{tableName.logical}<span if={tableName.logical && tableName.physical}> / </span>{tableName.physical}</h1>\
          </header>\
          <main>\
            <ul>\
              <li each={columns}>\
                <h2>{name.logical}<span if={name.logical && name.physical}> / </span>{name.physical}</h2>\
              </li>\
              <li>\
                <h2>{getColor(color, color)}</h2>\
              </li>\
            </ul>\
          </main>\
          <footer>\
          </footer>\
        </section>\
      </div>\
    </div>\
  </main>\
  <style each={global.colors}>\
    .pg-canvas-table-color-{name} h1 {\
      color: hoge;\
    }\
    .pg-canvas-table-color-{name} h2 {\
      color: {text.column};\
    }\
  </style>\
  \
  \
</er-canvas>')
    ], ErCanvas);
    return ErCanvas;
})(Riot.Element);
ErCanvas.register();
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
