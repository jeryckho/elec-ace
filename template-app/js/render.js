const { getCurrentWindow, dialog, Menu, MenuItem } = require('electron').remote
var fs = require('fs');

var jsonInstance = ace.edit('editorJson', { mode: "ace/mode/hjson" });
var htmInstance = ace.edit('editorHtm', { mode: "ace/mode/handlebars" });

var Htm = document.getElementById('Htm');
var Json = document.getElementById('Json');
var EdHtm = document.getElementById('editorHtm').parentNode;
var EdJson = document.getElementById('editorJson').parentNode;

var eds = document.getElementsByClassName("eds");
var edHtm = document.getElementsByClassName("htm");
var edJson = document.getElementsByClassName("json");
var selector = document.getElementsByClassName("selector");

Element.prototype.isNodeList = function() {return false;}
NodeList.prototype.isNodeList = HTMLCollection.prototype.isNodeList = function(){return true;}

// Build our new menu
var menu = new Menu()
menu.append(new MenuItem({
  label: 'Ouvrir un fichier',
  click: openHandler
}))
menu.append(new MenuItem({
  label: 'Enregistrer',
  click: saveHandler
}))

function openHandler () {
  var fileNames = dialog.showOpenDialog(getCurrentWindow());

  if (fileNames !== undefined) {
      var fileName = fileNames[0];
      fs.readFile(fileName, 'utf8', function (err, data) {
          jsonInstance.setValue(data);
      });
  }
}

function saveHandler () {
  var fileName = dialog.showSaveDialog(getCurrentWindow());

  if (fileName !== undefined) {
      fs.writeFile(fileName, jsonInstance.getValue(), function(err, data) {
        
      });
  }
}


var inout = document.getElementById('InOut');
inout.addEventListener('click', (e) => {
    e.preventDefault()
    menu.popup(getCurrentWindow())
  }, false)

document.getElementById('Htm').addEventListener('click', (e) => {
    e.preventDefault();
    removeClass(selector, 'active');
    hide(eds);

    addClass(Htm, 'active');
    show(edHtm, 'block');
  }, false)

  document.getElementById('Json').addEventListener('click', (e) => {
    e.preventDefault();
    removeClass(selector, 'active');
    hide(eds);

    addClass(Json, 'active');
    show(edJson, 'block');
  }, false)

jsonInstance.setTheme('ace/theme/twilight');

htmInstance.setTheme('ace/theme/twilight');
