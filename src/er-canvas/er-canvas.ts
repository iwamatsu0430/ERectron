/// <reference path="../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="./resource/eventName.ts"/>

@template('\
<er-canvas>\
  <main class="pg-main-canvas">\
    <div class="pg-canvas-container">\
      <div class="pg-canvas-table" each={tables}>\
        <section>\
          <header>\
            <h1>{tableName}</h1>\
          </header>\
          <main>\
            <ul>\
              <li each={columns}>\
                <h2>{columnName}</h2>\
              </li>\
            </ul>\
          </main>\
          <footer>\
          </footer>\
        </section>\
      </div>\
    </div>\
  </main>\
</er-canvas>')
class ErCanvas extends Riot.Element
{
  tables = [];

  constructor() {
    super();

    this.tables = [
      {
        tableName: "member",
        columns: [
          {
            columnName: "memberId",
          },
          {
            columnName: "mail"
          },
          {
            columnName: "password"
          },
          {
            columnName: "confirmed"
          }
        ]
      },
      {
        tableName: "tweet"
      },
    ];

    window.observable.on(EventName.app.onLoadFile, (filePath: string) => {
      if (filePath) {
        // TODO load file
      }
    });
  }
}

ErCanvas.register();
