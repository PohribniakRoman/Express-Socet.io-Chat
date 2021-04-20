const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;
let messages = [];

io.on("connection", (socket) => {
  socket.on("join",()=>{
    socket.emit("get history",messages);
  })

  socket.on("massage", (data) => {
    if (messages.length > 30) {
      messages = []
    }
    messages.push(data);
    io.emit("sendMessage", data);
  });
});

app.use(express.static("publick"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}...`);
});