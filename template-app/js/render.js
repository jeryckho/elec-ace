const { getCurrentWindow, dialog, Menu, MenuItem } = require('electron').remote
var fs     = require('fs');

var JavaScriptMode = ace.require('ace/mode/javascript').Mode;
var editorInstance = ace.edit('editor');

// Build our new menu
var menu = new Menu()
menu.append(new MenuItem({
  label: 'Open',
  click: openHandler
}))
menu.append(new MenuItem({
  label: 'SaveAs',
  click: saveHandler
}))

function openHandler () {
  var fileNames = dialog.showOpenDialog(getCurrentWindow());

  if (fileNames !== undefined) {
      var fileName = fileNames[0];
      fs.readFile(fileName, 'utf8', function (err, data) {
          editorInstance.setValue(data);
      });
  }
}

function saveHandler () {
  var fileName = dialog.showSaveDialog(getCurrentWindow());

  if (fileName !== undefined) {
      fs.writeFile(fileName, editorInstance.getValue(), function(err, data) {
        
      });
  }
}


// Add the listener
// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('.js-context-menu').addEventListener('click', function (event) {
//     menu.popup(getCurrentWindow());
//   })
// })

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(getCurrentWindow())
}, false)

editorInstance.setTheme('ace/theme/twilight');
editorInstance.session.setMode(new JavaScriptMode());