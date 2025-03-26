import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./authentication/UserAuth";
import HomePage from "./components/HomePage";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import UserProfile from "./components/UserProfile";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>

        <Route path="/" element={
          token ? <Navigate to="/home" /> : <Login setToken={setToken} />} 
        />

        <Route path="/home" element={
          token ? <HomePage /> : <Navigate to="/" />} 
        />

        <Route path="/books" element={
          token ? <BookList /> : <Navigate to="/" />}
        />

        <Route path="/books/:id" element={
          token ? <BookDetails /> : <Navigate to="/" />} 
        />

        <Route path="/profile" element={
          token ? <UserProfile /> : <Navigate to="/" />} 
        />

      </Routes>
    </Router>
  );
}

export default App;