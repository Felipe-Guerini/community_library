import db from "../config/database.js";

db.run(`
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
);`);

function createBookRepository(newBook, userId) {
  return new Promise((resolve, reject) => {
    const { title, author } = newBook;

    db.run(
      `INSERT INTO books (title, author, userId) VALUES (?, ?, ?)`,
      [title, author, userId],
      function (err) {
        if (err) {
          console.error("Repository: createBookRepository - Erro DB:", err);
          reject(err);
        } else {
          resolve({ id: this.lastID, ...newBook });
        }
      }
    );
  });
}

function findAllBooksRepository() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM books`, [], (err, rows) => {
      if (err) {
        console.error("Repository: findAllBooksRepository - Erro DB:", err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function findBookByIdRepository(bookId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM books WHERE id = ?`, [bookId], (err, row) => {
      if (err) {
        console.error("Repository: findBookByIdRepository - Erro DB:", err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function updateBookRepository(bookId, updatedBook) {
  return new Promise((resolve, reject) => {
    const fields = ["title", "author"];
    let query = `UPDATE books SET `;
    const values = [];

    fields.forEach((field) => {
      if (updatedBook[field] !== undefined) {
        query += `${field} = ?, `;
        values.push(updatedBook[field]);
      }
    });

    if (values.length === 0) {
      console.warn(
        "Repository: updateBookRepository - Nenhum campo para atualizar fornecido."
      );
      return reject(new Error("Nenhum campo para atualizar."));
    }

    query = query.slice(0, -2);
    query += ` WHERE id = ?`;
    values.push(bookId);

    db.run(query, values, function (err) {
      if (err) {
        console.error("Repository: updateBookRepository - Erro DB:", err);
        reject(err);
      } else {
        if (this.changes === 0) {
          console.warn(
            `Repository: updateBookRepository - Nenhum livro encontrado com ID ${bookId} para atualizar.`
          );
          reject(
            new Error(
              "Livro não encontrado para atualização ou nenhum dado alterado."
            )
          );
        } else {
          console.log(
            `Repository: updateBookRepository - Livro ID ${bookId} atualizado com sucesso. Linhas afetadas: ${this.changes}`
          );
          resolve({ id: bookId, ...updatedBook });
        }
      }
    });
  });
}

function deleteBookRepository(bookId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM books WHERE id = ?`, [bookId], function (err) {
      if (err) {
        console.error("Repository: deleteBookRepository - Erro DB:", err);
        reject(err);
      } else {
        if (this.changes === 0) {
          resolve({
            message:
              "Nenhum livro encontrado com o ID especificado para deletar.",
            bookId,
          });
        } else {
          resolve({ message: "Livro deletado com sucesso", bookId });
        }
      }
    });
  });
}

function deleteAllBooksRepository() {
  return new Promise((resolve, reject) => {
    console.log(
      "Repository: deleteAllBooksRepository - Executando DELETE FROM books"
    );
    db.run(`DELETE FROM books`, [], function (err) {
      if (err) {
        console.error("Repository: deleteAllBooksRepository - Erro DB:", err);
        reject(err);
      } else {
        console.log(
          `Repository: deleteAllBooksRepository - TODOS os livros deletados com SUCESSO. Linhas afetadas: ${this.changes}`
        );
        resolve({
          message: `Todos os ${this.changes} livros foram deletados com sucesso.`,
        });
      }
    });
  });
}

function searchBookRepository(search) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`,
      [`%${search}%`, `%${search}%`],
      (err, rows) => {
        if (err) {
          console.error("Repository: searchBookRepository - Erro DB:", err);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

export default {
  createBookRepository,
  findAllBooksRepository,
  findBookByIdRepository,
  updateBookRepository,
  deleteBookRepository,
  deleteAllBooksRepository,
  searchBookRepository,
};
