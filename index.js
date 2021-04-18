const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;

const massages = [];

io.on("connection", (socket) => {

  socket.on("massage", (data) => {
    massages.push(data);
    io.emit("sendMassage", data);
  });
  
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}...`);
});
