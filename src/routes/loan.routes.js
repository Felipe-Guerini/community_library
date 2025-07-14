import { Router } from "express";
import loanController from "../controller/loan.controller.js";
import {
  validate,
  validateLoanId,
} from "../middlewares/validation.middlewares.js";
import { loanSchema } from "../schema/loan.schema.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post(
  authMiddleware,
  validate(loanSchema),
  loanController.createLoanController
);

router.get(loanController.findAllLoansController);

router.get("/:id", validateLoanId, loanController.findLoanByIdController);

router.delete(
  "/:id",
  validateLoanId,
  authMiddleware,
  loanController.deleteLoanController
);

export default router;
