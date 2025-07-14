import bookService from "../service/book.service.js";

async function createBookController(req, res) {
  const newBook = req.body;
  const userId = req.userId;

  try {
    const createdBook = await bookService.createBookService(newBook, userId);
    res.status(201).send(createdBook);
  } catch (error) {
    console.error("ERRO NO CREATE BOOK CONTROLLER:", error);
    return res
      .status(400)
      .send({ message: error.message || "Erro desconhecido ao criar livro." });
  }
}

async function findAllBooksController(req, res) {
  try {
    const books = await bookService.findAllBooksService();
    res.status(200).send(books);
  } catch (error) {
    console.error("Erro ao buscar todos os livros:", error.message);
    res
      .status(404)
      .send({ message: error.message || "Livros não encontrados." });
  }
}

async function findBookByIdController(req, res) {
  const bookId = req.params.id;

  try {
    const book = await bookService.findBookByIdService(bookId);
    return res.status(200).send(book);
  } catch (error) {
    console.error("Erro ao buscar livro por ID:", error.message);
    return res
      .status(404)
      .send({ message: error.message || "Livro não encontrado." });
  }
}

async function updateBookController(req, res) {
  const updateBook = req.body;
  const bookId = req.params.id;
  const userId = req.userId;

  try {
    const updatedBook = await bookService.updateBookService(
      updateBook,
      bookId,
      userId
    );
    return res.status(200).send(updatedBook);
  } catch (error) {
    console.error("ERRO NO UPDATE BOOK CONTROLLER:", error);
    res
      .status(404)
      .send({ message: error.message || "Erro ao atualizar livro." });
  }
}

async function deleteBookController(req, res) {
  const bookId = req.params.id;
  const userId = req.userId;

  try {
    const response = await bookService.deleteBookService(bookId, userId);
    return res.status(200).send(response);
  } catch (error) {
    console.error("ERRO NO DELETE BOOK CONTROLLER:", error);
    res
      .status(400)
      .send({ message: error.message || "Erro ao deletar livro." });
  }
}

async function deleteAllBooksController(req, res) {
  try {
    const message = await bookService.deleteAllBooksService();
    res.status(200).send({ message });
  } catch (err) {
    console.error("Erro ao deletar todos os livros:", err.message);
    res
      .status(500)
      .send({
        message: err.message || "Erro interno ao deletar todos os livros.",
      });
  }
}

async function searchBookController(req, res) {
  const { search } = req.query;

  try {
    const books = await bookService.searchBookService(search);
    res.status(200).send(books);
  } catch (error) {
    console.error("Erro na busca de livros:", error.message);
    res
      .status(404)
      .send({
        message:
          error.message || "Nenhum livro encontrado para o termo de busca.",
      });
  }
}

export default {
  createBookController,
  findAllBooksController,
  findBookByIdController,
  updateBookController,
  deleteBookController,
  deleteAllBooksController,
  searchBookController,
};
