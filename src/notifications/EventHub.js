var EventEmitter = require("events").EventEmitter;

function EventHub(){
  var evtEmitter = new EventEmitter();
  evtEmitter.setMaxListeners(0);

  return evtEmitter;
}

module.exports = new EventHub();
