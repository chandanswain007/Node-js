// server.js

const express = require('express');
const bookService = require('./services/bookService');
const myEmitter = require('./eventEmitter');

const app = express();
const PORT = 3000;

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Book Management API" });
});

// GET all books [cite: 37]
app.get('/books', async (req, res) => {
    try {
        const books = await bookService.getBooksFromFile();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books" });
    }
});

// GET a single book by ID [cite: 39]
app.get('/books/:id', async (req, res) => {
    try {
        const books = await bookService.getBooksFromFile();
        const book = books.find(b => b.id === parseInt(req.params.id));
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving book" });
    }
});

// POST a new book [cite: 41]
app.post('/books', async (req, res) => {
    try {
        const { title, author } = req.body;
        if (!title || !author) {
            return res.status(400).json({ message: "Title and author are required" });
        }
        const books = await bookService.getBooksFromFile();
        const newBook = {
            id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
            title,
            author
        };
        books.push(newBook);
        await bookService.writeBooksToFile(books);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: "Error adding book" });
    }

    myEmitter.emit('bookAdded',newBook);
    res.status(201).json(newBook);
});

// PUT to update a book by ID [cite: 43]
app.put('/books/:id', async (req, res) => {
    try {
        const books = await bookService.getBooksFromFile();
        const index = books.findIndex(b => b.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ message: "Book not found" });
        }
        const updatedBook = { ...books[index], ...req.body };
        books[index] = updatedBook;
        await bookService.writeBooksToFile(books);
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Error updating book" });
    }

    // Inside the PUT handler, after the book is updated
        myEmitter.emit('bookUpdated', updatedBook);
        res.json(updatedBook);
});

// DELETE a book by ID [cite: 45]
app.delete('/books/:id', async (req, res) => {
    try {
        let books = await bookService.getBooksFromFile();
        const filteredBooks = books.filter(b => b.id !== parseInt(req.params.id));
        if (books.length === filteredBooks.length) {
            return res.status(404).json({ message: "Book not found" });
        }
        await bookService.writeBooksToFile(filteredBooks);
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ message: "Error deleting book" });
    }
    // Inside the DELETE handler, before sending the response
    myEmitter.emit('bookDeleted', req.params.id);
    res.status(204).send();
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

myEmitter.on('bookAdded', (book) => {
    console.log(`Book Added: ${book.title}`);
  });
  
  myEmitter.on('bookUpdated', (book) => {
    console.log(`Book Updated: ${book.title}`);
  });
  
  myEmitter.on('bookDeleted', (id) => {
    console.log(`Book with ID: ${id} has been deleted.`);
  });