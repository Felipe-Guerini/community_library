// src/repositories/loan.repositories.js

import db from "../config/database.js";

db.run(`
CREATE TABLE IF NOT EXISTS loans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    bookId INTEGER,
    loanDate DATE DEFAULT CURRENT_TIMESTAMP, /* Adicionado para registrar a data do empréstimo */
    dueDate DATE,
    returnDate DATE NULL, /* Adicionado para marcar quando o livro foi devolvido */
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (bookId) REFERENCES books(id)
);`);

function createLoanRepository(userId, bookId, dueDate) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO loans (userId, bookId, dueDate) VALUES (?, ?, ?)`, // loanDate será DEFAULT
      [userId, bookId, dueDate],
      function (err) {
        if (err) {
          console.error("Repository: createLoanRepository - Erro DB:", err); // Log de erro no DB
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            userId,
            bookId,
            dueDate,
            loanDate: new Date().toISOString().split("T")[0],
          }); // Retorna loanDate aproximado
        }
      }
    );
  });
}

function findAllLoansRepository() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM loans`, [], (err, rows) => {
      if (err) {
        console.error("Repository: findAllLoansRepository - Erro DB:", err); // Log de erro no DB
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// --- NOVA FUNÇÃO ADICIONADA: PARA VERIFICAR SE O LIVRO ESTÁ ATIVAMENTE EMPRESTADO ---
function findActiveLoanByBookId(bookId) {
  return new Promise((resolve, reject) => {
    // Busca um empréstimo para este livro onde 'returnDate' é NULL (ainda não foi devolvido)
    db.get(
      `SELECT * FROM loans WHERE bookId = ? AND returnDate IS NULL`,
      [bookId],
      (err, row) => {
        if (err) {
          console.error("Repository: findActiveLoanByBookId - Erro DB:", err);
          reject(err);
        } else {
          resolve(row); // Retorna o empréstimo ativo (ou null se não houver)
        }
      }
    );
  });
}
// --- FIM DA NOVA FUNÇÃO ---

export default {
  createLoanRepository,
  findAllLoansRepository,
  findActiveLoanByBookId,
}; // <<-- EXPORTAR A NOVA FUNÇÃO
