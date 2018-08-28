Element.prototype.isNodeList = function() {return false;}
NodeList.prototype.isNodeList = HTMLCollection.prototype.isNodeList = function(){return true;}

function hide(el) {
  show(el, "none");
}

function show(el, value) {
  if (el.isNodeList()) {
    for (let o of el) {
      o.style.display = value;
    }
  } else {
    el.style.display = value;
  }
}

function hasClass(el, className) {
  return el.classList.contains(className);
}

function addClass(el, className) {
  if (el.isNodeList()) {
    for (let o of el) {
      o.classList.add(className);
    }
  } else {
    el.classList.add(className);
  }
}

function removeClass(el, className) {
  if (el.isNodeList()) {
    for (let o of el) {
      o.classList.remove(className);
    }
  } else {
    el.classList.remove(className);
  }
}
