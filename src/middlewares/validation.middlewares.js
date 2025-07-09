import { userIdSchema } from "../schema/user.schema.js";
import { bookIdSchema } from "../schema/book.schema.js";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Dados de entrada inválidos", errors: error.errors });
  }
};

const validateUserId = (req, res, next) => {
  try {
    const userId = +req.params.id;
    userIdSchema.parse({ userId: userId });
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "ID de usuário inválido", errors: error.errors });
  }
};

const validateBookId = (req, res, next) => {
  try {
    bookIdSchema.parse({ bookId: +req.params.id });
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "ID do livro inválido", errors: error.errors });
  }
};

export { validate, validateUserId, validateBookId };
