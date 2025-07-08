import bookRepository from "../repositories/book.repositories.js";

async function createBookService(newBook, userId) {
  const createBook = await bookRepository.createBookRepository(newBook, userId);
  if (!createBook) throw new Error("Error creating book");
  return createBook;
}

async function findAllBooksService() {
  return await bookRepository.findAllBooksRepository();
}

async function findBookByIdService(bookId) {
  const book = await bookRepository.findBookByIdRepository(bookId);
  if (!book) throw new Error("Book not found");
  return book;
}

async function updateBookService(updateBook, bookId, userId) {
  const book = await bookRepository.findBookByIdRepository(bookId);
  if (!book) throw new Error("Book not found");

  if (book.userId !== userId) {
    throw new Error("Unauthorized");
  }

  const updatedBook = await bookRepository.updateBookRepository(
    bookId,
    updateBook
  );
  return updatedBook;
}

async function deleteBookService(bookId, userId) {
  const book = await bookRepository.findBookByIdRepository(bookId);
  if (!book) throw new Error("Book not found");

  if (book.userId !== userId) {
    throw new Error("Unauthorized");
  }

  const deletedBook = await bookRepository.deleteBookRepository(bookId);
  return deletedBook;
}

async function deleteAllBooksService() {
  console.log(
    "Service: deleteAllBooksService - Tentando apagar todos os livros."
  );
  const response = await bookRepository.deleteAllBooksRepository();
  return response;
}

async function searchBookService(search) {
  console.log(`Service: searchBookService - Buscando por: "${search}"`);
  const books = await bookRepository.searchBookRepository(search);

  return books;
}

export default {
  createBookService,
  findAllBooksService,
  findBookByIdService,
  updateBookService,
  deleteBookService,
  deleteAllBooksService,
  searchBookService,
};
