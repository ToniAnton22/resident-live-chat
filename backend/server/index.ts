import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
    },
  });

  try {
    app.use(cors());
    app.use(express.json());

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("message", (data) => {
        io.emit("message", data);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
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

startServer()