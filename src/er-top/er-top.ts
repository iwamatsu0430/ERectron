/// <reference path="../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../resource/eventName.ts"/>

@template('\
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
class ErTop extends Riot.Element {
  
  constructor () {
    super();
    document.addEventListener("selectstart", e => e.preventDefault());
  }

  onClickOpen = e => {
    e.preventDefault();
    return false;
  }

  onClickCreate = e => {
    e.preventDefault();
    window.observable.trigger(EventName.app.onLoadFile, null);
    return false;
  }

  onClickRecent = e => {
    e.preventDefault();
    return false;
  };

  isOpenHover = false;

  onMouseOverOpen = e => {
    this.isOpenHover = true;
  }

  onMouseOutOpen = e => {
    this.isOpenHover = false;
  }
}

ErTop.register();
