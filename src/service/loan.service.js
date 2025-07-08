// src/service/loan.service.js

import loanRepositories from "../repositories/loan.repositories.js";
import userRepository from "../repositories/user.repositories.js"; // <<-- NOVO IMPORT
import bookRepository from "../repositories/book.repositories.js"; // <<-- NOVO IMPORT

async function createLoanService(userId, bookId, dueDate) {
  console.log(
    "Service: createLoanService - Tentando criar empréstimo para User:",
    userId,
    "Book:",
    bookId,
    "DueDate:",
    dueDate
  ); // Log de depuração

  // --- VALIDAÇÕES CRÍTICAS ADICIONADAS AQUI ---

  // 1. Verificar se o usuário (userId) existe
  const user = await userRepository.findUserByIdRepository(userId);
  if (!user) {
    console.error(
      "Service: createLoanService - ERRO: Usuário não encontrado com ID:",
      userId
    );
    throw new Error("Usuário não encontrado.");
  }

  // 2. Verificar se o livro (bookId) existe
  const book = await bookRepository.findBookByIdRepository(bookId);
  if (!book) {
    console.error(
      "Service: createLoanService - ERRO: Livro não encontrado com ID:",
      bookId
    );
    throw new Error("Livro não encontrado.");
  }

  // 3. Verificar se o livro já está emprestado (precisa de uma função no repositório)
  // Assumimos que você terá uma coluna 'returnDate' ou 'isActive' para indicar um empréstimo ativo.
  // Por simplicidade, vamos verificar se existe algum empréstimo para este bookId onde o returnDate é NULL.
  const activeLoan = await loanRepositories.findActiveLoanByBookId(bookId); // <<< Você precisará CRIAR esta função
  if (activeLoan) {
    console.error(
      "Service: createLoanService - ERRO: Livro já está emprestado com ID:",
      bookId
    );
    throw new Error("Este livro já está emprestado.");
  }

  // --- FIM DAS VALIDAÇÕES ---

  try {
    const createdLoan = await loanRepositories.createLoanRepository(
      userId,
      bookId,
      dueDate
    );
    console.log(
      "Service: createLoanService - Empréstimo criado com sucesso:",
      createdLoan
    ); // Log de sucesso
    return createdLoan;
  } catch (dbError) {
    // Captura erros do banco de dados com uma mensagem mais específica
    console.error(
      "Service: createLoanService - Erro ao criar empréstimo no DB:",
      dbError
    );
    // Erros de chave estrangeira geralmente têm uma mensagem no 'dbError'
    if (
      dbError.message &&
      dbError.message.includes("FOREIGN KEY constraint failed")
    ) {
      throw new Error(
        "Falha de dados: Usuário ou Livro não existem (chave estrangeira)."
      );
    }
    throw new Error("Erro desconhecido ao registrar o empréstimo."); // Mensagem genérica se não for FK
  }
}

async function findAllLoansService() {
  const loans = await loanRepositories.findAllLoansRepository();
  return loans;
}

export default { createLoanService, findAllLoansService };
