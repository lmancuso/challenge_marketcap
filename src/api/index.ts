import http from "http";
import "dotenv/config";

import express, { Application } from "express";
import config from "../config";

import routes from "./routes";

const {
  server: { port },
} = config;

const api = () => {
  const app: Application = express();
  http.createServer(app);

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use("/", routes);

  app.listen(port, () => console.log("Listening in port", port));

  return app;
};

export default api;
