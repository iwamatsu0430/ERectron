/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../resources/eventName.ts"/>
/// <reference path="../../utils/viewUtil.ts"/>

@template(ViewUtil.loadView("view/er-top/er-top.html"))
class ErTop extends Riot.Element {

  isOpenHover: boolean = false;

  constructor () {
    super();
    document.addEventListener("selectstart", e => e.preventDefault());
  }

  onClickOpen = (e: MouseEvent) => {
    e.preventDefault();
    return false;
  }

  onClickCreate = (e: MouseEvent) => {
    e.preventDefault();
    window.observable.trigger(EventName.app.onLoadFile, null);
    return false;
  }

  onClickRecent = (e: MouseEvent) => {
    e.preventDefault();
    return false;
  }

  onMouseOverOpen = (e: MouseEvent) => {
    this.isOpenHover = true;
  }

  onMouseOutOpen = (e: MouseEvent) => {
    this.isOpenHover = false;
  }
}

ErTop.register();
