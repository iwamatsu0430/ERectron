/// <reference path="../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../../d.ts/github-electron/github-electron.d.ts" />
/// <reference path="../../resources/eventName.ts"/>
/// <reference path="../../utils/viewUtil.ts"/>

let fs      = require('fs');
let remote  = require('remote');
let dialog  = remote.require('dialog');

let language = "en";

@template(ViewUtil.loadView("common/er-app.html"))
class ErApp extends Riot.Element {

   constructor (opts: any) {
     super();

     document.ondragover = e => e.preventDefault();
     document.ondrop = e => e.preventDefault();
     window.observable = new Riot.Observable();

     window.observable.on(EventName.app.onLoadFile, () => {
       this.isFileOpen = true;
       this.update();
     });
   }

   isFileOpen = false;

   onDragOver = (e: MouseEvent) => e.preventDefault();

   onDragLeave = (e: MouseEvent) => e.preventDefault();

   onDrop = (e: any) => {
     e.preventDefault();
     let filePath = e.dataTransfer.files[0];
   }

  //  onLoadFile = e => {
  //    e.preventDefault();
  //    let options = {
  //        title: 'Select .erm file',
  //        filters: [
  //          { name: 'ERM Json', extensions: ['json'] },
  //          { name: 'ERM XML', extensions: ['erm'] }
  //        ],
  //    };
  //    dialog.showOpenDialog(null, options, fn => {
  //      console.log(fn);
  //      let path = fn[0];
  //      fs.readFile(path, (error, text) => {
  //     		if (error != null) {
  //     			alert('error : ' + error);
  //     			return ;
  //     		}
  //         let value = text.toString();
  //         console.log(value);
  //         dialog.showSaveDialog(null, {
  //           title: "ERM save",
  //           filters: [
  //             { name: 'ERM Json', extensions: ['json'] },
  //             { name: 'ERM XML', extensions: ['erm'] }
  //           ]
  //         }, fn => {
  //           fs.writeFile(fn, value, error => {
  //             console.log(error);
  //           });
  //         })
  //     	});
  //    });
  //  }
}

ErApp.register();
