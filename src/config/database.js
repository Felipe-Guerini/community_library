import sqlite3 from 'sqlite3';

const db = new sqlite3.Database("library_db.sqlite", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados", err.message);
  } else {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  }
});

export default db;