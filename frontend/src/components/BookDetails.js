import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
  const token = localStorage.getItem("token");
    const fetchBookDetails = async () => {
      try {
        const res = await axiosInstance.get(`/books/${id}`, { 
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get(`/reviews?bookId=${id}` , { 
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchBookDetails();
    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/reviews", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: id, rating, comment }),
      });
      const data = await res.json();
      setReviews([...reviews, data.review]);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="p-6">
      {book && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-3xl font-semibold">{book.title}</h2>
          <p className="text-gray-600">by {book.author}</p>
          <p className="mt-2">Average Rating: {book.averageRating || "No ratings yet"}</p>
          <p>Total Comments: {reviews.length}</p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Reviews</h3>
        {reviews.map((review, index) => (
          <div key={index} className="border-b py-2">
            <p className="font-bold">User: {review.user}</p>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleReviewSubmit} className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Leave a Review</h3>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          className="border p-2 w-full mt-2"
          placeholder="Rating (1-5)"
          required
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 w-full mt-2"
          placeholder="Write your comment here..."
          required
        ></textarea>
        <button type="submit" className="mt-2 bg-blue-600 text-white p-2 rounded">Submit Review</button>
      </form>
    </div>
  );
};

export default BookDetails;
