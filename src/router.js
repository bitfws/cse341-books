import express from "express";

import {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
} from "./controllers/books.js";
import {
  getAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler,
} from "./controllers/authors.js";

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of books
 *       500:
 *         description: Internal server error
 */
router.get("/books", getBooksHandler);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get("/books/:id", getBookByIdHandler);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Invalid book data
 *       500:
 *         description: Unable to create book
 */
router.post("/books", createBookHandler);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Invalid book data
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to update book
 */
router.put("/books/:id", updateBookHandler);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to delete book
 */
router.delete("/books/:id", deleteBookHandler);

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     responses:
 *       200:
 *         description: List of authors
 *       500:
 *         description: Internal server error
 */
router.get("/authors", getAuthorsHandler);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author found
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.get("/authors/:id", getAuthorByIdHandler);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create an author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: number
 *     responses:
 *       201:
 *         description: Author created
 *       400:
 *         description: Invalid author data
 *       500:
 *         description: Unable to create author
 */
router.post("/authors", createAuthorHandler);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: number
 *     responses:
 *       200:
 *         description: Author updated
 *       400:
 *         description: Invalid author data
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to update author
 */
router.put("/authors/:id", updateAuthorHandler);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 *       409:
 *         description: Author still has books
 *       500:
 *         description: Unable to delete author
 */
router.delete("/authors/:id", deleteAuthorHandler);

export default router;
