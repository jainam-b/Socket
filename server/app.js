const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const cors = require("cors");
const PORT = 3000;
const app = express();
// socket code
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(
  cors(
    cors({
      origin: "http://localhost:5173/",
      methods: ["GET", "POST"],
      credentials: true,
    })
  )
);

app.get("/", (req, res) => {
  res.send("hello world");
});

io.on("connection", (socket) => {
  console.log("User connected");
  console.log("Id", socket.id);
  io.on("connection",(socket)=>{
    console.log("user connected ");
  })
  io.on("disconnection",(socket)=>{
    console.log("user connected ");
  })
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
