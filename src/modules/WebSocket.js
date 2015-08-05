var DEFAULT_SOCKET_PORT = 9933;
var EventHub = require('../notifications/EventHub');
var Console = require('./Console');
var WebSocketNotifications = require('../notifications/WebSocketNotifications');
var io = require('socket.io')(DEFAULT_SOCKET_PORT);
var Convert = require('ansi-to-html');

var CONNECTION = "connection-info";
var MESSAGES = "messages";
var ROOM = "/monitor";
var DEFAULT_MONITOR_URL = "monitor.html";
var room, converter;

function WebSocket(){
  converter = new Convert();
  setupListeners();

  return {
    start: startSocket
  };
}

function setupListeners(){
  EventHub.on(WebSocketNotifications.SEND_MESSAGE, emitToSocket);
}

function emitToSocket(text){
  //if(io.sockets.clients(ROOM).length() > 0){
    room.emit(MESSAGES, converter.toHtml(text));
//  }
}

function startSocket(){
  room = io
          .of(ROOM)
          .on('connection', onConnect)
          .on('error', onError);

  Console.monitorStart(DEFAULT_MONITOR_URL);
}

function onConnect(socket){

  //socketServer.on('disconnect', onDisconnect);
}
/*
function onDisconnect(){}
*/

function onError(){
  Console.monitorError();
}
//TODO: startSocket: get ip machine and pass as url; (2)
//TODO: onConnect: check if there are users to send messages in the room (3)
//TODO: start socket io not with require but with new... + test error scenarios (1)
//TODO: start server to show monitor.html page (5)
//TODO: change compilation time with timer (4)
//TODO: why if offline socket.io doesn't work?
//TODO: update website
//TODO: fix memory issue Win7


module.exports = WebSocket;
