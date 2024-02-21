import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SupabaseProvider } from "./context/SupabaseContext";
import { Book, NavLink } from "./types";
import AddBookPage from "./pages/AddBookPage";
import BooksReadPage from "./pages/BooksReadPage";
import User from "/user.svg";
import AddBook from "/addBook.svg";
import SearchBook from "/searchBook.svg";

const App: React.FC = () => {
  const navLinks: NavLink[] = [
    // {
    //   name: "User",
    //   path: "/user",
    // },
    {
      name: "Add Book",
      path: "/",
      icon: AddBook,
      alt: "Add Book"
    },
    {
      name: "Collection",
      path: "/booksRead",
      icon: SearchBook,
      alt: "Search Book",
    },
  ]
  const [books, setBooks] = useState<Book[]>([]);
  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
  };

  return (
    <SupabaseProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AddBookPage books={books} handleAddBook={handleAddBook} navLinks={navLinks} />
            }
          />
          <Route path="/booksRead" element={<BooksReadPage books={books} navLinks={navLinks} />} />
        </Routes>
      </Router>
    </SupabaseProvider>
  );
};

export default App;
