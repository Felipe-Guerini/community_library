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
  findActiveLoanByBookId,
};
