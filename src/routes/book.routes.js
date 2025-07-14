import bookControllers from "../controller/book.controllers.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import {
  validate,
  validateBookId,
} from "../middlewares/validation.middlewares.js";
import { bookSchema } from "../schema/book.schema.js";

const router = Router();

router.get(bookControllers.findAllBooksController);

router.post(
  validate(bookSchema),
  authMiddleware,
  bookControllers.createBookController
);

router.get("/search", bookControllers.searchBookController);

router.get("/:id", validateBookId, bookControllers.findBookByIdController);

router.delete(authMiddleware, bookControllers.deleteAllBooksController);

router.patch(
  "/:id",
  validateBookId,
  authMiddleware,
  bookControllers.updateBookController
);

router.delete(
  "/:id",
  validateBookId,
  authMiddleware,
  bookControllers.deleteBookController
);

export default router;
