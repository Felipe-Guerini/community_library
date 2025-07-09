import { Router } from "express";
import loanController from "../controller/loan.controller.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { loanSchema } from "../schema/loan.schema.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post(
  "/loans",
  authMiddleware,
  validate(loanSchema),
  loanController.createLoanController
);
router.get("/loans", loanController.findAllLoansController);

export default router;
