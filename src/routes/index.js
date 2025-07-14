import { Router } from "express";
import userRouters from "./user.routes.js";
import bookRouters from "./book.routes.js";
import loanRouters from "./loan.routes.js";

const router = Router();

router.use("/users", userRouters);
router.use("/books", bookRouters);
router.use("/loans", loanRouters);

export { router };
