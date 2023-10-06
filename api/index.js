import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);
//ver archivo vite.config por tema de cors.

io.on("connection", (socket) => {
  console.log(socket.id);
  //Escuchando un evento desde el front
  socket.on("message", (body) => {
    //envio a todos los clientes un evento
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(6),
    });
  });
});

server.listen(4000, console.log("listen port 4000"));
