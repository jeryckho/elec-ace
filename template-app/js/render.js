const { getCurrentWindow, dialog, Menu, MenuItem } = require('electron').remote
var fs = require('fs');

var Eds = {
  Json: ace.edit('editorJson', { mode: "ace/mode/hjson" }),
  Htm: ace.edit('editorHtm', { mode: "ace/mode/handlebars" })
}

var Titres = {
  Json: document.getElementById('TitreJson'),
  Htm: document.getElementById('TitreHtm')
};
var Ids = {
  Cible: document.getElementById('Cible'),
  InOut: document.getElementById('InOut'),
  Json: document.getElementById('Json'),
  Htm: document.getElementById('Htm')
};
var Clas = {
  Selectors: document.getElementsByClassName("selector"),
  Editors: document.getElementsByClassName("eds"),
  Json: document.getElementsByClassName("json"),
  Htm: document.getElementsByClassName("htm")
};

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
        var cible = Ids["Cible"].innerText;
        Eds[cible].setValue(data);
        Titres[cible].innerText = fileName;
      });
  }
}

function saveHandler () {
  var fileName = dialog.showSaveDialog(getCurrentWindow());

  if (fileName !== undefined) {
      fs.writeFile(fileName, Eds[Ids["Cible"].innerText].getValue(), function(err, data) {
        var cible = Ids["Cible"].innerText;
        Titres[cible].innerText = fileName;
      });
  }
}


function Select(mode) {
  Ids["Cible"].innerText = mode;
  removeClass(Clas["Selectors"], 'active');
  hide(Clas["Editors"]);

  addClass(Ids[mode], 'active');
  show(Clas[mode], 'block');
}

Ids["InOut"].addEventListener('click', (e) => {
    e.preventDefault()
    menu.popup(getCurrentWindow())
  }, false)

Ids['Htm'].addEventListener('click', (e) => {
    e.preventDefault();
    Select('Htm');
  }, false)

Ids['Json'].addEventListener('click', (e) => {
    e.preventDefault();
    Select('Json');
  }, false)

Eds['Json'].setTheme('ace/theme/twilight');
Eds['Htm'].setTheme('ace/theme/twilight');
