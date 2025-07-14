import "dotenv/config";
import express from "express";
import { router } from "./src/routes/index.js";
import "./src/service/cron.service.js";

console.log("Conteúdo de process.env.SECRET_JWT:", process.env.SECRET_JWT);
console.log("Tipo de process.env.SECRET_JWT:", typeof process.env.SECRET_JWT);

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta 3000 ${port}`);
});
