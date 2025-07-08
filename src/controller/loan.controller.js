// src/controller/loan.controller.js

import loanService from "../service/loan.service.js";

async function createLoanController(req, res) {
  const { bookId, dueDate } = req.body;
  const userId = req.userId; // Certifique-se que o userId está sendo injetado pelo authMiddleware

  try {
    const createdLoan = await loanService.createLoanService(
      userId,
      bookId,
      dueDate
    );
    res.status(201).send(createdLoan);
  } catch (error) {
    console.error("ERRO NO CREATE LOAN CONTROLLER:", error);
    res
      .status(400)
      .send({
        message: error.message || "Erro desconhecido ao criar empréstimo.",
      });
  }
} // <<-- createLoanController termina AQUI. NADA DEVE VIR DEPOIS DESTE } QUE SEJA PARTE DE createLoanController.

// --- findAllLoansController DEVE ESTAR AQUI, FORA DA FUNÇÃO ACIMA ---
async function findAllLoansController(req, res) {
  try {
    const loans = await loanService.findAllLoansService();
    res.status(200).send(loans);
  } catch (error) {
    console.error("Erro ao buscar todos os empréstimos:", error.message);
    res.status(404).send(error.message);
  }
}
// --- FIM DA FUNÇÃO findAllLoansController ---

export default { createLoanController, findAllLoansController };
