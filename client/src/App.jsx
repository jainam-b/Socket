import React from "react";
import { io } from "socket.io-client";
const App = () => {
  var socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
  
  return <div></div>;
};

export default App;
