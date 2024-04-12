import { io } from 'socket.io-client';
import staticInitObject from '../config/AllStaticConfig.js';

class SocketManager{
  constructor(){
    this.socket = null;
  }

  onConnect() {
    console.log("io connected");
  }

  onDisconnect() {
    console.log("io disconnected");
  }

  connect(token) {
    this.token = token;
    this.socket = io(staticInitObject.NOTIFICATION_SERVER_URL, { autoConnect: false, auth: { token: token, }, });
    this.socket.connect();
    this.socket.on('connect', this.onConnect);
    this.socket.on('disconnect', this.onDisconnect);
  }

  disconnect() {
    if(this.socket != null){
      this.socket.disconnect();
    }
  }

  getIo(){
    return this.socket;
  }
}

const socketManager = new SocketManager();
export { socketManager }
