const { BrowserWindow, getCurrentWindow, dialog, Menu, MenuItem } = require('electron').remote
var Mustache = require('mustache');
var Hjson = require('hjson');
var fs = require('fs');

var altWindow = null;

function makeW() {
  altWindow = new BrowserWindow({
    x:0,
    y:0,
    width: 200,
    height: 100,
    show: false
  });
  altWindow.setMenu(null);
  altWindow.on('closed', function() { altWindow = null });
  altWindow.once('ready-to-show', function() { console.log("dad"); altWindow.show(); });
}

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
  Resu: document.getElementById('Resu'),
  Json: document.getElementById('Json'),
  Htm: document.getElementById('Htm')
};
var Clas = {
  Selectors: document.getElementsByClassName("selector"),
  Editors: document.getElementsByClassName("eds"),
  Json: document.getElementsByClassName("json"),
  Htm: document.getElementsByClassName("htm")
};

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

function openHandler() {
  var cible = Ids["Cible"].innerText;
  var options = {
    defaultPath: Titres[cible].innerText,
    properties: [
      'openFile'
    ]
  };
  options.filters = (cible === 'Htm') ? [
    { name: 'Html', extensions: ['htm', 'html', 'htx'] },
    { name: 'All Files', extensions: ['*'] }
  ] : [
    { name: 'JSON', extensions: ['js', 'json', 'hjson'] },
    { name: 'All Files', extensions: ['*'] }
  ];

  var fileNames = dialog.showOpenDialog(getCurrentWindow(), options);

  if (fileNames !== undefined) {
    var fileName = fileNames[0];
    fs.readFile(fileName, 'utf8', function (err, data) {
      Eds[cible].setValue(data);
      Titres[cible].innerText = fileName;
    });
  }
}

function saveHandler () {
  var cible = Ids["Cible"].innerText;
  var options = {
    defaultPath: Titres[cible].innerText
  };
  options.filters = (cible === 'Htm') ? [
    { name: 'Html', extensions: ['htm', 'html', 'htx'] },
    { name: 'All Files', extensions: ['*'] }
  ] : [
    { name: 'JSON', extensions: ['js', 'json', 'hjson'] },
    { name: 'All Files', extensions: ['*'] }
  ];

  var fileName = dialog.showSaveDialog(getCurrentWindow(), options);

  if (fileName !== undefined) {
      fs.writeFile(fileName, Eds[Ids["Cible"].innerText].getValue(), function(err, data) {
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

Ids['Resu'].addEventListener('click', (e) => {
  e.preventDefault();
  if (!altWindow) {
    makeW();
  }
  var js = Hjson.parse(Eds["Json"].getValue());
  var tpl = Mustache.render( Eds["Htm"].getValue(), js );

  fs.writeFile("tmp.html", tpl, function(err, data) {
    altWindow.loadURL('file://' + __dirname + "/tmp.html");
  });
}, false)