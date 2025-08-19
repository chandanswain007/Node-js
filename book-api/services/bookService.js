const fs = require('fs').promises;
const path = require('path');

const booksFilePath = path.join(__dirname, '..', 'data', 'books.json');

// Function to read books from the file
const getBooksFromFile = async () => {
    try {
        const data = await fs.readFile(booksFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If the file doesn't exist or is empty, return an empty array
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
};

// Function to write books to the file
const writeBooksToFile = async (books) => {
    await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2), 'utf8');
};

module.exports = {
    getBooksFromFile,
    writeBooksToFile
};