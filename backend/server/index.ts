import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
let numUsersConnected = 0;
async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:4200",
        "https://resident-live-chat-two.vercel.app/",
      ],
      methods: ["GET", "POST"],
    },
  });

  try {
    app.use(cors());
    app.use(express.json());

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("messages", (data) => {
        if (data.ownerId == "system") {
          numUsersConnected += 1;
          io.emit("numConnected", numUsersConnected);
        }
        socket.broadcast.emit("messages", data);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        numUsersConnected -= 1;
        if (numUsersConnected < 0) {
          numUsersConnected = 0;
        }
        io.emit("numConnected", numUsersConnected);
        const message = {
          id: crypto.randomUUID(),
          ownerId: "system",
          message: "Someone has left the chat.",
          timestamp: new Date().toDateString(),
        };
        socket.broadcast.emit("messages", message);
      });
    });

    const PORT = process.env.PORT || 3000;

    httpServer.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "An unknown error has occured";
    console.error(
      `An unknown error has occured during server run. ${JSON.stringify(e)}`,
    );
    console.log(`Error: ${message}`);
    if (io) io.close();
    if (httpServer) httpServer.close();
  }
}

startServer();
