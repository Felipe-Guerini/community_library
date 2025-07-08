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

router.get("/books/search", bookControllers.searchBookController);

router.get(
  "/books/:id",
  validateBookId,
  bookControllers.findBookByIdController
);

router.delete(
  "/books",
  authMiddleware,
  bookControllers.deleteAllBooksController
);

router.patch(
  "/books/:id",
  validateBookId,
  authMiddleware,
  bookControllers.updateBookController
);

router.delete(
  "/books/:id",
  validateBookId,
  authMiddleware,
  bookControllers.deleteBookController
);

export default router;
