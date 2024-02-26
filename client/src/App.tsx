import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SupabaseProvider } from "./context/SupabaseContext";
import { Book, NavLink } from "./types";
import AddBookPage from "./pages/AddBookPage";
import BooksReadPage from "./pages/BooksReadPage";
// import User from "/user.svg";
import AddBook from "/addBook.svg";
import SearchBook from "/searchBook.svg";

const App: React.FC = () => {
  const navLinks: NavLink[] = [
    // {
    //   name: "User",
    //   path: "/user",
    //   icon: User,
    //   alt: "User",
    // },
    {
      name: "Add Book",
      path: "/",
      icon: AddBook,
      alt: "Add Book",
    },
    {
      name: "Collection",
      path: "/booksRead",
      icon: SearchBook,
      alt: "Search Book",
    },
  ];

  const [searchedBook, setSearchedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
  };

  const handleConfirmBook = () => {
    if (searchedBook) {
      // TODO: add date to book object
      setSearchedBook({...searchedBook, dateFinished: date});
      // TODO: add book to db
      // await addBookToDb(searchedBook);
      console.log("Book to confirm:", searchedBook);
      setSearchedBook(null);
    }
  };

  const handleCancelBook = () => {
    // discard selection
    if (searchedBook) {
      console.log("discard selection");
      setTimeout(() => {
        setSearchedBook(null);
      }, 500);
      // setSearchedBook(null);
    }
  };

  const handleSearch = async (book: Book) => {
    // console.log(book);
    setSearchedBook(book);
  };

  return (
    <SupabaseProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AddBookPage
                books={books}
                handleAddBook={handleAddBook}
                navLinks={navLinks}
                handleCancelBook={handleCancelBook}
                handleConfirmBook={handleConfirmBook}
                searchedBook={searchedBook}
                handleSearch={handleSearch}
              />
            }
          />
          <Route
            path="/booksRead"
            element={<BooksReadPage books={books} navLinks={navLinks} />}
          />
        </Routes>
      </Router>
    </SupabaseProvider>
  );
};

export default App;
