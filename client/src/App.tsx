import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SupabaseProvider, useSupabase } from "./context/SupabaseContext";

import { Book, NavLink } from "./types";
import { Database } from "../src/types/supabase";

import AddBookPage from "./pages/AddBookPage";
import BooksReadPage from "./pages/BooksReadPage";
import BooksSearchPage from "./pages/BooksSearchPage";

// import User from "/user.svg";
import AddBook from "/addBook.svg";
import ViewBook from "/viewBook.svg";
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
      icon: ViewBook,
      alt: "View Book Collection",
    },
    {
      name: "Search Book",
      path: "/bookSearch",
      icon: SearchBook,
      alt: "Search Books",
    },
  ];

  const [searchedBook, setSearchedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [bookNotFound, setBookNotFound] = useState(false);
  const [addBook, setAddBook] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);

  const supabase = useSupabase();

  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
  };

  const handleConfirmBook = async () => {
    if (searchedBook) {
      console.log(searchedBook)
      const bookToInsert: Database["public"]["Tables"]["books"]["Insert"] = {
        title: searchedBook.title,
        author: searchedBook.author,
        published: searchedBook.published || null,
        pages: searchedBook.pages || null,
        // keep camelCase to add to db for image & date
        cover_img_url: searchedBook.coverImageUrl || null,
        date_finished: searchedBook.dateFinished || null,
      };
      const { data, error } = await supabase
        .from("books")
        .insert([bookToInsert]);

      if (error) {
        console.log("Error:", error);
      } else if (data) {
        const addedBook = data;
        handleAddBook(addedBook);
        console.log("Data:", data);
      }
      setSearchedBook(null);
    }
  };

  const handleManuallyAddBook = async (newBook: Book) => {
    if (newBook) {
      const bookToInsert: Database["public"]["Tables"]["books"]["Insert"] = {
        title: newBook.title,
        author: newBook.author,
        published: newBook.published || null,
        pages: newBook.pages || null,
        cover_img_url: newBook.cover_img_url || null,
        // must be camelCase to manually add book
        date_finished: newBook.dateFinished || null,
      };
      const { data, error } = await supabase
        .from("books")
        .insert([bookToInsert]);

      if (error) {
        console.log("Error:", error);
      } else if (data) {
        const addedBook = data;
        handleAddBook(addedBook);
        console.log("Data:", data);
      }
      setAddBook(false);
    }
  };

  const handleCancelBook = () => {
    console.log("isEditing", isEditing);
    if (searchedBook) {
      setTimeout(() => {
        setSearchedBook(null);
      }, 500);
    }
    setSearchedBook(null);
  };

  const handleSearch = async (book: Book) => {
    setSearchedBook(book);
  };

  const handleDataFetch = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("date_finished", { ascending: false });
    if (error) {
      console.log("Error:", error);
    } else {
      setBooks(data);
    }
  };

  const handleEditBook = () => {
    console.log("clicked edit book");
    setIsEditing(true);
    console.log("reached handleEditBook function");
    console.log("isEditing", isEditing);
  };

  // const handleEditBook = () => {
  //   console.log("clicked edit book");
  //   setIsEditing(true);
  //   console.log("clicked edit book");
  //   console.log("isEditing", isEditing);
  // };

  useEffect(() => {
    console.log(`Editing state changed in App: ${isEditing}`);
  }, [isEditing]);

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
                bookNotFound={bookNotFound}
                setBookNotFound={setBookNotFound}
                handleManuallyAddBook={handleManuallyAddBook}
                onSearch={handleSearch}
                addBook={addBook}
                handleEditBook={handleEditBook}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            }
          />
          <Route
            path="/booksRead"
            element={
              <BooksReadPage
                navLinks={navLinks}
                books={books}
                handleDataFetch={handleDataFetch}
              />
            }
          />
          <Route
            path="/bookSearch"
            element={
              <BooksSearchPage
              navLinks={navLinks}
              books={books}
              handleDataFetch={handleDataFetch}
              />
            }
          />
        </Routes>
      </Router>
    </SupabaseProvider>
  );
};

export default App;
