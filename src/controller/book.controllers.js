import { de } from "zod/v4/locales";
import bookService from "../service/book.service.js";

async function createBookController(req, res) {
  const newBook = req.body;
  const userId = req.userId;

  try {
    const createdBook = await bookService.createBookService(newBook, userId);
    res.status(201).send(createdBook);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function findAllBooksController(req, res) {
  try {
    const books = await bookService.findAllBooksService();
    res.send(books);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function findBookByIdController(req, res) {
  const bookId = req.params.id;

  try {
    const book = await bookService.findBookByIdService(bookId);
    return res.send(book);
  } catch (error) {
    return res.status(404).send(error.message);
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
    return res.send(response);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function deleteBookController(req, res) {
  const bookId = req.params.id;
  const userId = req.userId;

  try {
    const response = await bookService.deleteBookService(bookId, userId);
    return res.send(response);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function deleteAllBooksController(req, res) {
  try {
    const message = await bookService.deleteAllBooksService();
    res.status(200).send({ message });
  } catch (err) {
    console.error("Erro ao deletar todos os livros:", err.message);
    res.status(500).send(err.message);
  }
}

async function searchBookController(req, res) {
  const { search } = req.query;

  try {
    const books = await bookService.searchBookService(search);
    res.send(books);
  } catch (error) {
    res.status(404).send(error.message);
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
