import { userIdSchema } from "../schema/user.schema.js";
import { bookIdSchema } from "../schema/book.schema.js";
import { loanIdSchema } from "../schema/loan.schema.js";

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
    const bookId = +req.params.id;
    bookIdSchema.parse({ bookId: bookId });
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "ID do livro inválido", errors: error.errors });
  }
};

const validateLoanId = (req, res, next) => {
  try {
    const loanId = +req.params.id;
    loanIdSchema.parse({ loanId: loanId });
    next();
  } catch (error) {
    console.error("ERRO NO VALIDATE LOAN ID MIDDLEWARE:");
    console.error("Objeto de erro completo (ZodError):", error);
    console.error("error.message:", error.message);
    console.error("error.errors:", error.errors);
    console.error("-----------------------------------");

    res.status(400).json({
      message: "ID do empréstimo inválido",
      errors: error.errors,
    });
  }
};

export { validate, validateUserId, validateBookId, validateLoanId };
