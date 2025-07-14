import loanService from "../service/loan.service.js";

async function createLoanController(req, res) {
  const { bookId, dueDate } = req.body;
  const userId = req.userId;

  try {
    const createdLoan = await loanService.createLoanService(
      userId,
      bookId,
      dueDate
    );
    res.status(201).send(createdLoan);
  } catch (error) {
    console.error("ERRO NO CREATE LOAN CONTROLLER:", error);
    res.status(400).send({
      message: error.message || "Erro desconhecido ao criar empréstimo.",
    });
  }
}

async function findAllLoansController(req, res) {
  try {
    const loans = await loanService.findAllLoansService();
    res.status(200).send(loans);
  } catch (error) {
    console.error("Erro ao buscar todos os empréstimos:", error.message);
    res
      .status(404)
      .send({ message: error.message || "Empréstimos não encontrados." });
  }
}

async function findLoanByIdController(req, res) {
  const loanId = req.params.id;

  try {
    const loan = await loanService.findLoanByIdService(loanId);
    return res.status(200).send(loan);
  } catch (error) {
    console.error("Erro ao buscar empréstimo por ID:", error.message);
    res
      .status(404)
      .send({ message: error.message || "Empréstimo não encontrado." });
  }
}

async function deleteLoanController(req, res) {
  const loanId = req.params.id;
  const userId = req.userId;

  try {
    const response = await loanService.deleteLoanService(loanId, userId);
    return res.status(200).send(response);
  } catch (error) {
    console.error("ERRO NO DELETE LOAN CONTROLLER:", error);
    res
      .status(400)
      .send({ message: error.message || "Erro ao deletar empréstimo." });
  }
}

export default {
  createLoanController,
  findAllLoansController,
  findLoanByIdController,
  deleteLoanController,
};
