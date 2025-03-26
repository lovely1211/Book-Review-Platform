const Book = require("../models/Book");

const postBooks = async (req, res) => {
    try {
        const { title, author, genre, rating } = req.body;

        const newBook = new Book({ title, author, genre, rating });
        await newBook.save();

        res.status(201).json({ message: "Book add successfully", book: newBook });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error", error: error.message });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
};

const getBooksById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await Book.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
};

const postReviews = async (req, res) => {
    try {
        const { bookId, rating, comment } = req.body;

        const newReview = new Review({ bookId, rating, comment, user: req.user.id });
        await newReview.save();

        res.status(201).json({ message: "Review submitted", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
};

module.exports = { postBooks, getAllBooks, getBooksById, getReviews, postReviews };
