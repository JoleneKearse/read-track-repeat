import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SupabaseProvider } from "./context/SupabaseContext";
import { Book } from "./types";
import AddBookPage from "./pages/AddBookPage";
import BooksReadPage from "./pages/BooksReadPage";

interface NavLink {
  name: string;
  path: string;
}

const App: React.FC = () => {
  const navLinks: NavLink[] = [
    // {
    //   name: "User",
    //   path: "/user",
    // },
    {
      name: "Add Book",
      path: "/",
    },
    {
      name: "Collection",
      path: "/booksRead",
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
