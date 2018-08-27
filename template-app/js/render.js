const { getCurrentWindow, dialog, Menu, MenuItem } = require('electron').remote
var fs = require('fs');

var jsonInstance = ace.edit('editorJson', { mode: "ace/mode/json" });
var htmInstance = ace.edit('editorHtm', { mode: "ace/mode/handlebars" });

var Htm = document.getElementById('Htm');
var Json = document.getElementById('Json');
var EdHtm = document.getElementById('editorHtm').parentNode;
var EdJson = document.getElementById('editorJson').parentNode;

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

function hide(el) {
  el.style.display = 'none';
}

function show(el, value) {
  el.style.display = value;
}

function hasClass(el, className) {
  return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}

var inout = document.getElementById('InOut');
inout.addEventListener('click', (e) => {
    e.preventDefault()
    menu.popup(getCurrentWindow())
  }, false)

document.getElementById('Htm').addEventListener('click', (e) => {
    e.preventDefault();
    if (!hasClass(Htm, 'active')) addClass(Htm, 'active');
    show(EdHtm, 'block');
    if (hasClass(Json, 'active')) removeClass(Json, 'active');
    hide(EdJson);
  }, false)

  document.getElementById('Json').addEventListener('click', (e) => {
    e.preventDefault();
    if (!hasClass(Json, 'active')) addClass(Json, 'active');
    show(EdJson, 'block');
    if (hasClass(Htm, 'active')) removeClass(Htm, 'active');
    hide(EdHtm);
  }, false)

jsonInstance.setTheme('ace/theme/twilight');

htmInstance.setTheme('ace/theme/twilight');
