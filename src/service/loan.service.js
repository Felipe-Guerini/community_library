import loanRepositories from "../repositories/loan.repositories.js";
import userRepository from "../repositories/user.repositories.js";
import bookRepository from "../repositories/book.repositories.js";

async function createLoanService(userId, bookId, dueDate) {
  console.log(
    "Service: createLoanService - Tentando criar empréstimo para User:",
    userId,
    "Book:",
    bookId,
    "DueDate:",
    dueDate
  );

  const user = await userRepository.findUserByIdRepository(userId);
  if (!user) {
    console.error(
      "Service: createLoanService - ERRO: Usuário não encontrado com ID:",
      userId
    );
    throw new Error("Usuário não encontrado.");
  }

  const book = await bookRepository.findBookByIdRepository(bookId);
  if (!book) {
    console.error(
      "Service: createLoanService - ERRO: Livro não encontrado com ID:",
      bookId
    );
    throw new Error("Livro não encontrado.");
  }

  const activeLoan = await loanRepositories.findActiveLoanByBookId(bookId);
  if (activeLoan) {
    console.error(
      "Service: createLoanService - ERRO: Livro já está emprestado com ID:",
      bookId
    );
    throw new Error("Este livro já está emprestado.");
  }

  try {
    const createdLoan = await loanRepositories.createLoanRepository(
      userId,
      bookId,
      dueDate
    );
    console.log(
      "Service: createLoanService - Empréstimo criado com sucesso:",
      createdLoan
    );
    return createdLoan;
  } catch (dbError) {
    console.error(
      "Service: createLoanService - Erro ao criar empréstimo no DB:",
      dbError
    );

    if (
      dbError.message &&
      dbError.message.includes("FOREIGN KEY constraint failed")
    ) {
      throw new Error(
        "Falha de dados: Usuário ou Livro não existem (chave estrangeira)."
      );
    }
    throw new Error("Erro desconhecido ao registrar o empréstimo.");
  }
}

async function findAllLoansService() {
  const loans = await loanRepositories.findAllLoansRepository();
  return loans;
}

export default { createLoanService, findAllLoansService };
