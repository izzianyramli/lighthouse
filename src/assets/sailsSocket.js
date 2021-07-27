import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';

let io;
io = sailsIOClient(socketIOClient);
io.sails.url = 'http://192.168.0.107:1337';

export default io;
