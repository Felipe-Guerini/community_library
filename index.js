import "dotenv/config";
import express from "express";
import userRouters from "./src/routes/user.routes.js";
import bookRouters from "./src/routes/book.routes.js";
import loanRouters from "./src/routes/loan.routes.js";

console.log("Conteúdo de process.env.SECRET_JWT:", process.env.SECRET_JWT);
console.log("Tipo de process.env.SECRET_JWT:", typeof process.env.SECRET_JWT);

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouters);
app.use(bookRouters);
app.use(loanRouters);

app.listen(port, () => {
  console.log(`Servidor rodando na porta 3000 ${port}`);
});
