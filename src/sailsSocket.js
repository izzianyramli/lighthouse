import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';

let io;
io = sailsIOClient(socketIOClient);
io.sails.url = 'http://192.168.1.106:1337';
// var mySocket = io.sails.connect(['http://10.226.223.250:1337'], ['websocket', 'polling']);
// io.sails.transports = ['websocket', 'polling'];

export default io;
