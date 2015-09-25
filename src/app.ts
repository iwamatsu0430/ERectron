/// <reference path="../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="./declare.ts"/>
/// <reference path="../d.ts/github-electron/github-electron.d.ts" />
/// <reference path="./resource/eventName.ts"/>

var fs      = require('fs');
var remote  = require('remote');
var dialog  = remote.require('dialog');

var language = "en";

@template('\
<app>\
  <div class="sg-container" ondragover={onDragOver} ondragleave={onDragLeave} ondrop={onDrop}>\
    <er-top class={pg-top-display: !isFileOpen}></er-top>\
    <er-canvas class={pg-canvas-display: isFileOpen}></er-canvas>\
  </div>\
</app>')
class App extends Riot.Element {

   constructor (opts) {
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

   onDragOver = e => e.preventDefault();

   onDragLeave = e => e.preventDefault();

   onDrop = e => {
     e.preventDefault();
     var filePath = e.dataTransfer.files[0];
   }

  //  onLoadFile = e => {
  //    e.preventDefault();
  //    var options = {
  //        title: 'Select .erm file',
  //        filters: [
  //          { name: 'ERM Json', extensions: ['json'] },
  //          { name: 'ERM XML', extensions: ['erm'] }
  //        ],
  //    };
  //    dialog.showOpenDialog(null, options, fn => {
  //      console.log(fn);
  //      var path = fn[0];
  //      fs.readFile(path, (error, text) => {
  //     		if (error != null) {
  //     			alert('error : ' + error);
  //     			return ;
  //     		}
  //         var value = text.toString();
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

App.register();
