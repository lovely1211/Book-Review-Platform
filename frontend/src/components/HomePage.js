import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import AddBooks from "./AddBooks";

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProfile = async () => {
        try {
          const response = await axiosInstance.get(`/books`, { 
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }); 
          setBooks(response.data);
        } catch (error) {
          console.error('Failed to fetch books:', error);
        }
      };
  
      fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Book Review Platform</h1>
        <div>
          <Link to="/books" className="mx-2 hover:underline">Books</Link>
          <Link to="/profile" className="mx-2 hover:underline">Profile</Link>
        </div>
      </nav>
      <header className="text-center py-12 bg-blue-500 text-white">
        <h2 className="text-3xl font-semibold">Discover & Review Amazing Books</h2>
        <p className="mt-2">Read reviews, rate books, and share your thoughts with others!</p>
        <Link to="/books" className="mt-4 inline-block bg-white text-blue-600 px-6 py-2 rounded-lg shadow-md hover:bg-gray-200">Browse Books</Link>
      </header>
      <section className="p-6">
        <h3 className="text-2xl font-semibold text-center mb-4">Featured Books</h3>
        <AddBooks />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white shadow-md rounded-lg p-4 text-center">
              <img src={book.image} alt={book.title} className="w-full h-40 object-cover rounded-md mb-2" />
              <h4 className="text-lg font-semibold">{book.title}</h4>
              <p className="text-gray-600">by {book.author}</p>
              <Link to={`/books/${book.id}`} className="block mt-2 text-blue-600 hover:underline">View Details</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;