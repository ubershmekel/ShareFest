/**
 * Created with JetBrains WebStorm.
 * User: Shachar
 * Date: 13/11/12
 * Time: 22:10
 * To change this template use File | Settings | File Templates.
 */
var io = require('socket.io').listen(80);
var rooms = require('rooms.js');

io.sockets.on('connection', function (socket) {
    socket.emit('connectionReady', {});

    socket.on('join',function(msg){
        users[users.length-1] = socket.id;
    });

    socket.on('offer', function (msg) {
        for(var i=0;i<users.length;++i){
            if(users[i]!=socket.id){        //publishing the offer to all other users
                this.sendOffer(socket.id,msg);
            }
        }
    });

    socket.on('answer', function (msg) {    //msg = {socketid:...,data:...}
        this.answer(msg.socketid,msg);
    });


    socket.on('disconnect', function (msg) {


    });
});

this.send = function (socketId, message) {
    var s = io.sockets.sockets[socketId];
    if (s) {
        s.emit('send', message);
    }
};

this.sendOffer = function (socketId, message) {
    var s = io.sockets.sockets[socketId];
    if (s) {
        s.emit('offer', message);
    }
};

this.answer = function (socketId, message) {
    var s = io.sockets.sockets[socketId];
    if (s) {
        s.emit('answer', message);
    }
};