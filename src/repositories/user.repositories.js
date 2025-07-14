import db from "../config/database.js";

db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT
    );
`);

function createUserRepository(newUser) {
  return new Promise((resolve, reject) => {
    const { username, email, password, avatar } = newUser;
    db.run(
      `
        INSERT INTO users (username, email, password, avatar)
        VALUES (?, ?, ?, ?);
      `,
      [username, email, password, avatar],
      function (err) {
        if (err) {
          console.error("Repository: createUserRepository - Erro DB:", err);
          reject(err);
        } else {
          resolve({ id: this.lastID, ...newUser });
        }
      }
    );
  });
}

function findUserByEmailRepository(email) {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT id, username, email, avatar, password
      FROM users
      WHERE email = ?;
      `,
      [email],
      (err, row) => {
        if (err) {
          console.error("Repository: findUserByEmailRepository - Erro DB:", err);
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function findUserByUsernameRepository(username) {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT id, username, email, avatar
      FROM users
      WHERE username = ?;
      `,
      [username],
      (err, row) => {
        if (err) {
          console.error("Repository: findUserByUsernameRepository - Erro DB:", err);
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function findUserByIdRepository(id) {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT id, username, email, avatar
      FROM users
      WHERE id = ?;
      `,
      [id],
      (err, row) => {
        if (err) {
          console.error("Repository: findUserByIdRepository - Erro DB:", err);
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function findAllUserRepository() {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT id, username, email, avatar FROM users;
    `,
      [],
      (err, rows) => {
        if (err) {
          console.error("Repository: findAllUserRepository - Erro DB:", err);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

function updateUserRepository(id, user) {
  return new Promise((resolve, reject) => {
    const { username, email, password, avatar } = user;
    const fields = ["username", "email", "password", "avatar"];
    let query = "UPDATE users SET ";
    const values = [];

    fields.forEach((field) => {
      if (user[field] !== undefined) {
        query += `${field} = ?, `;
        values.push(user[field]);
      }
    });

    if (values.length === 0) {
        console.warn("Repository: updateUserRepository - Nenhum campo para atualizar fornecido.");
        return reject(new Error("Nenhum campo para atualizar."));
    }

    query = query.slice(0, -2); 
    query += " WHERE id = ?;";

    values.push(id);

    console.log(`Repository: updateUserRepository - Query: ${query}`); 
    console.log(`Repository: updateUserRepository - Values: ${values}`); 

    db.run(query, values, (err) => {
      if (err) {
        console.error("Repository: updateUserRepository - Erro DB:", err);
        reject(err);
      } else {
        if (this.changes === 0) {
            console.warn(`Repository: updateUserRepository - Nenhum usuário encontrado com ID ${id} para atualizar.`);
            reject(new Error("Usuário não encontrado para atualização ou nenhum dado alterado."));
        } else {
            resolve({ ...user, id });
        }
      }
    });
  });
}

async function deleteUserRepository(id) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      DELETE FROM users
      WHERE id = ?;
      `,
      [id],
      (err) => {
        if (err) {
          console.error("Repository: deleteUserRepository - Erro DB:", err);
          reject(err);
        } else {
          if (this.changes === 0) {
              resolve({ message: "Nenhum usuário encontrado para deletar.", id });
          } else {
              resolve({ message: "User deleted successfully", id });
          }
        }
      }
    );
  });
}

export default {
  createUserRepository,
  findUserByEmailRepository,
  findUserByUsernameRepository,
  findUserByIdRepository,
  findAllUserRepository,
  updateUserRepository,
  deleteUserRepository,
};