import { useState, useEffect } from 'react';
import axiosInstance from "../axiosInstance";
import { Link } from "react-router-dom";
import BackButton from './PageBack';

const BookList = () => {
    const [books, setBooks] = useState([]);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
        const fetchBooks = async () => {
            try {
              const response = await axiosInstance.get(`/books` , { 
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
              }); 
              setBooks(response.data);
            } catch (error) {
              console.error('Failed to fetch books:', error);
            }
          };
      
          fetchBooks();
      }, []);
  
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">All Books</h2>
        <BackButton />
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
      </div>
    );
  };

  export default BookList;