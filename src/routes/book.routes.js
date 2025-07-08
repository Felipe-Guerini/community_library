// src/routes/book.routes.js

import bookControllers from "../controller/book.controllers.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import {
  validate,
  validateBookId,
} from "../middlewares/validation.middlewares.js";
import { bookSchema } from "../schema/book.schema.js";

const router = Router();

router.get("/books", bookControllers.findAllBooksController);

router.post(
  "/books",
  validate(bookSchema),
  authMiddleware,
  bookControllers.createBookController
);

router.get(
  "/books/:id",
  validateBookId,
  bookControllers.findBookByIdController
);

// --- NOVA ROTA ADICIONADA AQUI (PARA DELETAR TODOS) ---
router.delete(
  "/books", // URL sem :id
  authMiddleware, // Geralmente requer autenticação, talvez até um middleware de admin
  bookControllers.deleteAllBooksController // Novo controller para esta ação
);
// --- FIM DA NOVA ROTA ---

router.patch(
  "/books/:id",
  validateBookId,
  authMiddleware,
  bookControllers.updateBookController
);

router.delete(
  "/books/:id", // Sua rota DELETE /:id existente
  validateBookId,
  authMiddleware,
  bookControllers.deleteBookController
);

export default router;
