/// <reference path="../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../resource/eventName.ts"/>

@template('\
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
class ErCanvas extends Riot.Element
{
  global = {};
  tables = [];

  constructor() {
    super();

    // example for develop
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

    // example for develop
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

    window.observable.on(EventName.app.onLoadFile, (filePath: string) => {
      if (filePath) {
        // TODO load file
      }
    });
  }

  hoge = () => "aiueo"

  getColor = (name: string, target: string): string => {
    return name + " + " + target;
  }
}

ErCanvas.register();
