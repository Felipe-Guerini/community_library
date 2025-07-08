import { ca } from "zod/v4/locales";
import { userIdSchema } from "../schema/user.schema.js";
import { bookIdSchema } from "../schema/book.schema.js";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (e) {
    res.status(400).json({ error: e.errors });
  }
};

const validateUserId = (req, res, next) => {
  try {
    const userId = +req.params.id;
    userIdSchema.parse({ userId: userId });
    next();
  } catch (e) {
    res.status(400).json({ error: e.errors });
  }
};

const validateBookId = (req, res, next) => {
  try {
    bookIdSchema.parse({ bookId: +req.params.id });
    next();
  } catch (e) {
    res.status(400).json({ error: e.errors });
  }
};
export { validate, validateUserId, validateBookId };
