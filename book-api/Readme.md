# Book Management REST API

This is a simple REST API to manage a collection of books stored in a JSON file.

## Setup and Installation

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm start
    ```
The server will run on `http://localhost:3000`.

## API Endpoints

* `GET /books`: Retrieve all books.
* `GET /books/:id`: Retrieve a single book by its ID.
* `POST /books`: Add a new book. Requires a JSON body with `title` and `author`.
* `PUT /books/:id`: Update an existing book's details.
* `DELETE /books/:id`: Delete a book by its ID.