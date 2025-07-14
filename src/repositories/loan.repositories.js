import db from "../config/database.js";

db.run(`
CREATE TABLE IF NOT EXISTS loans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    bookId INTEGER,
    loanDate DATE DEFAULT CURRENT_TIMESTAMP,
    dueDate DATE,
    returnDate DATE NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (bookId) REFERENCES books(id)
);`);

function createLoanRepository(userId, bookId, dueDate) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO loans (userId, bookId, dueDate) VALUES (?, ?, ?)`,
      [userId, bookId, dueDate],
      function (err) {
        if (err) {
          console.error("Repository: createLoanRepository - Erro DB:", err);
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            userId,
            bookId,
            dueDate,
            loanDate: new Date().toISOString().split("T")[0],
          });
        }
      }
    );
  });
}

function findAllLoansRepository() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM loans`, [], (err, rows) => {
      if (err) {
        console.error("Repository: findAllLoansRepository - Erro DB:", err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function findLoanByIdRepository(loanId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM loans WHERE id = ?`, [loanId], (err, row) => {
      if (err) {
        console.error("Repository: findLoanByIdRepository - Erro DB:", err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function deleteLoanRepository(loanId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM loans WHERE id = ?`, [loanId], function (err) {
      if (err) {
        console.error("Repository: deleteLoanRepository - Erro DB:", err);
        reject(err);
      } else {
        if (this.changes === 0) {
          resolve({
            message:
              "Nenhum empréstimo encontrado com o ID especificado para deletar.",
            loanId,
          });
        } else {
          resolve({ message: "Empréstimo deletado com sucesso", loanId });
        }
      }
    });
  });
}

function findActiveLoanByBookId(bookId) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM loans WHERE bookId = ? AND returnDate IS NULL`,
      [bookId],
      (err, row) => {
        if (err) {
          console.error("Repository: findActiveLoanByBookId - Erro DB:", err);
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

export default {
  createLoanRepository,
  findAllLoansRepository,
  findLoanByIdRepository,
  deleteLoanRepository,
  findActiveLoanByBookId,
};
