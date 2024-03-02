import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const ChatApp = () => {
  const socket = useMemo(() => {
    return io("http://localhost:3000", {
      transports: ["websocket", "polling", "flashsocket"],
    });
  }, []);

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ChatApp;
