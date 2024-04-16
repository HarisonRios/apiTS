import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo-client";
import { UserController } from "./controllers/user-controller";
import { MongoRepository } from "./repositories/mongo-repository";

config();

async function main() {
  await MongoClient.connect();
  const app = express();
  const port = process.env.PORT;
  app.use(express.json());
  app.use(cors());

  app.get("/usuario/:id", async (req, res) => {
    const userController = new UserController(new MongoRepository());
    const { statusCode, body } = await userController.getUser(req);
    res.status(statusCode).send(body);
  });

  app.get("/usuarios", async (req, res) => {
    const userController = new UserController(new MongoRepository());
    const { statusCode, body } = await userController.getAllUsers();
    res.status(statusCode).send(body);
  });

  app.post("/usuario", async (req, res) => {
    const userController = new UserController(new MongoRepository());
    const { statusCode, body } = await userController.createUser(req);
    res.status(statusCode).send(body);
  });

  app.listen(port);
}

main();
