var DEFAULT_SOCKET_PORT = 9933;
var EventHub = require('../notifications/EventHub');
var Console = require('./Console');
var WebSocketNotifications = require('../notifications/WebSocketNotifications');
var io = require('socket.io');

var Convert = require('ansi-to-html');

var CONNECTION = "connection-info";
var MESSAGES = "messages";
var ROOM = "/monitor";
var DEFAULT_MONITOR_URL = "monitor.html";
var room, converter, socketIO;

function WebSocket(){
  converter = new Convert();

  return {
    start: startSocket
  };
}

function setupListeners(){
  EventHub.on(WebSocketNotifications.SEND_MESSAGE, emitToSocket);
}

function emitToSocket(text){
  if(Object.keys(socketIO.nsps["/monitor"].adapter.rooms).length > 0){
    room.emit(MESSAGES, converter.toHtml(text));
  }
}

function startSocket(){
  socketIO = new io(DEFAULT_SOCKET_PORT);
  room = socketIO
          .of(ROOM)
          .on('connection', onConnect);

  setupListeners();
}

function onConnect(socket){
  //socketServer.on('disconnect', onDisconnect);
}


//TODO: update website
//TODO: test cli
//TODO: add IP input in monitor.html

module.exports = WebSocket;
