const express = require("express");
const { postBooks, getAllBooks, getBooksById, getReviews, postReviews } = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/books", postBooks);

router.get("/books", authMiddleware, getAllBooks);

router.get("/books/:id", authMiddleware, getBooksById);

router.get("/reviews", authMiddleware, getReviews);

router.post("/reviews", authMiddleware, postReviews);

module.exports = router;