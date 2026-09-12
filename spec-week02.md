# Books API Week 02 Spec

## Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal

Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model

Book documents will be stored in the `books` collection.

Required book fields:

- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors

Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books

Purpose: Return all books.

Success:

- Status code: `200`
- Response body: an array of book objects

Errors:

- `500` if an unexpected server or database error occurs

#### GET /books/:id

Purpose: Return one book by its custom id.

Success:

- Status code: `200`
- Response body: the matching book object

Errors:

- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books

Purpose: Create a new book.

Request body:

```
{
  "id": "b4",
  "authorId": "a1",
  "title": "Example Book Title",
  "publicationDate": "2026-01-15"
}
```

Success:

- Status code: `201`
- Response body: the newly created book object

Errors:

- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id

Purpose: Update an existing book.

Request body:

```
{
  "authorId": "a2",
  "title": "Updated Book Title",
  "publicationDate": "2026-02-20"
}
```

Success:

- Status code: `200`
- Response body: the updated book object

Errors:

- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id

Purpose: Delete an existing book.

Success:

- Status code: `204`
- Response body: none

Errors:

- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation

Swagger must document every book route.

### Deployment Expectations

After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Feature 2: Author CRUD Operations

### Goal

Add an `authors` collection to the Books API and provide full CRUD operations for authors. Every author route must be documented and testable in Swagger.

### Data Model

Author documents will be stored in the `authors` collection.

Required author fields:

- `id`: string, required, custom id such as `a1`
- `name`: string, required
- `birthYear`: number, required

Authors will use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Books

Books reference authors through the `authorId` field.

An author can have multiple books associated with it. An author cannot be deleted while one or more books still reference that author's `id`.

If a client attempts to delete an author who still has books, the API will return a `409` status code and the author will not be deleted.

### Routes

#### GET /authors

Purpose: Return all authors.

Success:

- Status code: `200`
- Response body: an array of author objects

Example response:

```
[
  {
    "id": "a1",
    "name": "Maya Rivera",
    "birthYear": 1985
  }
]
```

Errors:

- `500` if an unexpected server or database error occurs

#### GET /authors/:id

Purpose: Return one author by its custom id.

Success:

- Status code: `200`
- Response body: the matching author object

Example response:

```
{
  "id": "a1",
  "name": "Maya Rivera",
  "birthYear": 1985
}
```

Errors:

- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### POST /authors

Purpose: Create a new author.

Request body:

```
{
  "id": "a2",
  "name": "Daniel Brooks",
  "birthYear": 1978
}
```

Success:

- Status code: `201`
- Response body: the newly created author object

Errors:

- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if `birthYear` is not a valid number
- `500` if an unexpected server or database error occurs

#### PUT /authors/:id

Purpose: Update an existing author.

Request body:

```
{
  "name": "Daniel Brooks",
  "birthYear": 1979
}
```

Success:

- Status code: `200`
- Response body: the updated author object

Errors:

- `400` if a required field is missing
- `400` if `birthYear` is not a valid number
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /authors/:id

Purpose: Delete an existing author.

Success:

- Status code: `204`
- Response body: none

Errors:

- `404` if no author exists with that id
- `409` if the author still has one or more books associated with the author
- `500` if an unexpected server or database error occurs

### Swagger Documentation

Swagger must document every author route, including the required request bodies, response codes, and response examples.

### Deployment Expectations

After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

# Evaluation of Version 1

## 1. Bugs or Short-Sighted Decisions

The relationship between books and authors needs to be checked when books are created or updated. Without this check, a book could contain an `authorId` that does not exist in the `authors` collection.

The author delete operation also needs to check for related books before deleting an author. Otherwise, existing books could contain an `authorId` that no longer points to an author.

Using custom string ids makes the routes easy to test, but the API needs to make sure that ids are unique within each collection.

The specification should also make it clear that required fields cannot be empty values.

## 2. Security Considerations

The API should not return database connection details, stack traces, or other internal information in error responses.

MongoDB connection information should continue to be stored in environment variables rather than directly in the source code.

Request data should be validated before it is saved to the database. This helps prevent invalid data from being stored through the API.

The API should also avoid allowing clients to change the custom `id` of an existing book or author through a PUT request.

## 3. Efficiency Concerns

Checking whether an author exists when creating or updating a book requires an additional database query. This is necessary to keep the relationship valid.

Checking for books before deleting an author also requires a database query, but it prevents broken relationships in the database.

The API can use indexes on the custom `id` fields so lookups can remain efficient as the collections grow.

## 4. Response and Error Behavior

The API should use consistent JSON error responses for errors that return a response body.

For example:

```
{
  "message": "Book not found"
}
```

or:

```
{
  "message": "Author not found"
}
```

Validation errors should also provide a message that explains what is wrong with the request.

For successful DELETE requests, the API will return `204` with no response body.

# Version 2

## Feature 1: Book CRUD Operations and Author References

### Goal

Update the existing Week 01 book API so that each book references an author by `authorId` and the API supports complete CRUD operations. All book routes must be documented and testable through Swagger.

### Data Model

Book documents will be stored in the `books` collection.

Required fields:

- `id`: string, required, unique within the `books` collection
- `authorId`: string, required, must match an existing author `id`
- `title`: string, required and cannot be empty
- `publicationDate`: string, required, using ISO 8601 date format such as `2026-01-15`

The API will continue using custom string ids such as `b1` instead of MongoDB `_id` values for route parameters.

The `id` of an existing book cannot be changed through the PUT route.

### Relationship to Authors

Each book must reference an existing author through `authorId`.

When creating or updating a book:

- The API must verify that the submitted `authorId` exists in the `authors` collection.
- If the author does not exist, return `400`.
- The book must not be saved when the author reference is invalid.

### GET /books

Purpose: Return all books.

Success:

- `200`
- Response body is an array of book objects.

Errors:

- `500` for unexpected server or database errors.

### GET /books/:id

Purpose: Return one book using its custom `id`.

Success:

- `200`
- Response body is the matching book object.

Errors:

- `404` with a JSON message if the book does not exist.
- `500` for unexpected server or database errors.

Example `404` response:

```
{
  "message": "Book not found"
}
```

### POST /books

Purpose: Create a new book.

Request body:

```
{
  "id": "b4",
  "authorId": "a1",
  "title": "Example Book Title",
  "publicationDate": "2026-01-15"
}
```

Validation:

- All required fields must be present.
- String fields cannot be empty.
- `id` must be unique.
- `authorId` must match an existing author.
- `publicationDate` must use the expected ISO 8601 date format.

Success:

- `201`
- Response body is the newly created book object.

Errors:

- `400` for missing or invalid fields.
- `400` if the book `id` already exists.
- `400` if the author does not exist.
- `500` for unexpected server or database errors.

### PUT /books/:id

Purpose: Update an existing book.

Request body:

```
{
  "authorId": "a2",
  "title": "Updated Book Title",
  "publicationDate": "2026-02-20"
}
```

The request must contain all fields required for a book except `id`. The existing `id` comes from the route parameter and cannot be changed.

Validation:

- All required fields must be present.
- String fields cannot be empty.
- `authorId` must match an existing author.
- `publicationDate` must use the expected ISO 8601 date format.

Success:

- `200`
- Response body is the updated book object.

Errors:

- `400` for missing or invalid fields.
- `400` if the author does not exist.
- `404` if the book does not exist.
- `500` for unexpected server or database errors.

### DELETE /books/:id

Purpose: Delete an existing book using its custom `id`.

Success:

- `204`
- No response body.

Errors:

- `404` if the book does not exist.
- `500` for unexpected server or database errors.

### Swagger Documentation

Swagger must document:

- All five book routes.
- Required request fields.
- Request body examples for POST and PUT.
- Successful response codes.
- Error response codes.
- Response body examples where applicable.

Swagger must allow each route to be tested from the browser.

### Deployment

The book routes must work both locally and on the deployed Render application.

The deployed `/api-docs` page must document and allow testing of every book route.

## Feature 2: Author CRUD Operations

### Goal

Add an `authors` collection and provide complete CRUD operations for authors. Authors must be stored separately from books, and books must reference authors using `authorId`.

### Data Model

Author documents will be stored in the `authors` collection.

Required fields:

- `id`: string, required, unique within the `authors` collection
- `name`: string, required and cannot be empty
- `birthYear`: number, required

Authors will use custom string ids such as `a1` instead of MongoDB `_id` values for route parameters.

The `id` of an existing author cannot be changed through the PUT route.

### Relationship to Books

A single author can have multiple books.

Books store the author's custom id in the `authorId` field.

The API must prevent deletion of an author when one or more books reference that author.

### GET /authors

Purpose: Return all authors.

Success:

- `200`
- Response body is an array of author objects.

Errors:

- `500` for unexpected server or database errors.

Example response:

```
[
  {
    "id": "a1",
    "name": "Maya Rivera",
    "birthYear": 1985
  }
]
```

### GET /authors/:id

Purpose: Return one author using its custom `id`.

Success:

- `200`
- Response body is the matching author object.

Errors:

- `404` with a JSON message if the author does not exist.
- `500` for unexpected server or database errors.

Example `404` response:

```
{
  "message": "Author not found"
}
```

### POST /authors

Purpose: Create a new author.

Request body:

```
{
  "id": "a2",
  "name": "Daniel Brooks",
  "birthYear": 1978
}
```

Validation:

- All required fields must be present.
- `id` must be unique.
- `name` cannot be empty.
- `birthYear` must be a number.

Success:

- `201`
- Response body is the newly created author object.

Errors:

- `400` for missing or invalid fields.
- `400` if the author `id` already exists.
- `500` for unexpected server or database errors.

### PUT /authors/:id

Purpose: Update an existing author using its custom `id`.

Request body:

```
{
  "name": "Daniel Brooks",
  "birthYear": 1979
}
```

The request must contain all required author fields except `id`. The existing `id` comes from the route parameter and cannot be changed.

Validation:

- `name` must be present and cannot be empty.
- `birthYear` must be a number.

Success:

- `200`
- Response body is the updated author object.

Errors:

- `400` for missing or invalid fields.
- `404` if the author does not exist.
- `500` for unexpected server or database errors.

### DELETE /authors/:id

Purpose: Delete an author using its custom `id`.

Before deleting the author, the API must check whether any book contains the author's `id` in its `authorId` field.

If books are associated with the author:

- Do not delete the author.
- Return `409`.
- Return a JSON message explaining that the author cannot be deleted while books are associated with the author.

Example:

```
{
  "message": "Author cannot be deleted while books are associated with this author"
}
```

If the author does not have any associated books:

- Delete the author.
- Return `204`.
- Do not return a response body.

Other errors:

- `404` if the author does not exist.
- `500` for unexpected server or database errors.

### Swagger Documentation

Swagger must document:

- All five author routes.
- Required request fields.
- POST and PUT request body examples.
- Successful response codes.
- Error response codes.
- Response examples for JSON responses.

Swagger must allow each author route to be tested from the browser.

### Deployment

The author routes must work both locally and on the deployed Render application.

The deployed `/api-docs` page must document and allow testing of every author route.

The API should not expose MongoDB connection information, stack traces, or other internal server details through its responses.
