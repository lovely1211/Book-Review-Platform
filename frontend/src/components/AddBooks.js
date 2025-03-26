import { useState } from "react";
import axiosInstance from "../axiosInstance";
import BackButton from "./PageBack";

const AddBook = () => {
    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        rating: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/books", book);
            setMessage(response.data.message);
            setBook({ title: "", author: "", genre: "", rating: "" });
        } catch (error) {
            setMessage(error.response?.data?.message || "Server error");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2>Add Book</h2>
            <BackButton />
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={book.title} onChange={handleChange} required /><br /><br />
                <input type="text" name="author" placeholder="Author" value={book.author} onChange={handleChange} required /><br /><br />
                <input type="text" name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} required /><br /><br />
                <input type="number" name="rating" placeholder="Rating" value={book.rating} onChange={handleChange} required /><br /><br />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
