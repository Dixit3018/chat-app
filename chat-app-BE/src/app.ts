import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./config/mongo";
import routes from "./routes";
import dotenv from "dotenv";
import { initializeSocket } from "./sockets/socket";

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("../swagger");

dotenv.config();

const app = express();
const PORT = 3000;
const server = require("http").createServer(app);

// Middleware
app.use(cors());
app.use(bodyParser.json());
connectDB();

// Initialize Socket.io with the server
const io = initializeSocket(server);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/api", routes);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
