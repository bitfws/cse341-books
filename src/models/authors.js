import { getDb } from "../db/connect.js";

const getAllAuthors = async () => {
  const db = getDb();
  const collection = db.collection("authors");
  const authors = await collection.find({}).toArray();

  return authors;
};

const getAuthorById = async (authorId) => {
  const db = getDb();
  const collection = db.collection("authors");
  const author = await collection.findOne({ id: authorId });

  return author;
};

const createAuthor = async (author) => {
  const db = getDb();
  const collection = db.collection("authors");
  const result = await collection.insertOne(author);

  return result;
};

const updateAuthor = async (authorId, author) => {
  const db = getDb();
  const collection = db.collection("authors");

  const result = await collection.updateOne({ id: authorId }, { $set: author });

  return result;
};

const authorHasBooks = async (authorId) => {
  const db = getDb();
  const collection = db.collection("books");
  const book = await collection.findOne({ authorId });

  return Boolean(book);
};

const deleteAuthor = async (authorId) => {
  const db = getDb();
  const collection = db.collection("authors");
  const result = await collection.deleteOne({ id: authorId });

  return result;
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  authorHasBooks,
  deleteAuthor,
};
