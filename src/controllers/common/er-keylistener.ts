/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../utils/viewUtil.ts"/>

@template(ViewUtil.loadView("view/common/er-keylistener.html"))
class ErKeyListener extends Riot.Element {

  constructor () {
    super();

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      window.observable.trigger(EventName.app.onKeyDown, e.keyCode);
    });

    window.addEventListener("keyup", (e: KeyboardEvent) => {
      window.observable.trigger(EventName.app.onKeyUp, e.keyCode);
    });
  }
}

ErKeyListener.register();
