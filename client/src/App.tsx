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
  const [editedBook, setEditedBook] = useState<Book | null>(null);
  const [addBook, setAddBook] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
  const [mode, setMode] = useState<"add" | "edit">("add");

  const supabase = useSupabase();

  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
  };

  const handleConfirmBook = async (book: Book) => {
    console.log(book);
    if (book) {
      const bookToInsert: Database["public"]["Tables"]["books"]["Insert"] = {
        title: book.title,
        author: book.author,
        published: book.published || null,
        pages: book.pages || null,
        // keep camelCase to add to db for image & date
        cover_img_url: book.coverImageUrl || null,
        date_finished: book.dateFinished || null,
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
    console.log("canceled book", searchedBook);
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

  const handleEditBook = async (book: Book) => {
    console.log("clicked edit book", book);
    setIsEditing(true);
    setEditingBook(book);

    if (book && book.id) {
      const updatedBook = {
        title: book.title,
        author: book.author,
        published: book.published || null,
        pages: book.pages || null,
        cover_img_url: book.cover_img_url || null,
        date_finished: book.date_finished || null,
      };
      const { data, error } = await supabase
        .from("books")
        .update(updatedBook)
        .eq("id", book.id);

      if (error) {
        console.log("Error:", error);
      } else if (data) {
        console.log("Data:", data);
      }
    }
  };

  const handleSubmit = (updatedBook: Book) => {
    if (mode === "add") {
      handleConfirmBook(updatedBook);
    } else if (mode === "edit") {
      handleEditBook(updatedBook);
    }
  };

  const handleModeChange = (newMode: "add" | "edit", book?: Book) => {
    setMode(newMode);
    setEditedBook(book | null);
  };

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
                // searchedBook={searchedBook}
                handleSearch={handleSearch}
                bookNotFound={bookNotFound}
                // editedBook={editedBook}
                setEditedBook={setEditedBook}
                setBookNotFound={setBookNotFound}
                handleManuallyAddBook={handleManuallyAddBook}
                onSearch={handleSearch}
                addBook={addBook}
                handleEditBook={handleEditBook}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onSubmit={handleSubmit}
                searchedBook={mode === "add" ? searchedBook : null}
                editingBook={mode === "edit" ? editingBook : null}
                mode={mode}
                handleModeChange={handleModeChange}
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
                handleEditBook={handleEditBook}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                // editingBook={editingBook}
                setEditingBook={setEditingBook}
                searchedBook={mode === "add" ? searchedBook : null}
                editingBook={mode === "edit" ? editingBook : null}
                mode={mode}
                handleModeChange={handleModeChange}
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
                handleEditBook={handleEditBook}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                // editingBook={editingBook}
                setEditingBook={setEditingBook}
                mode={mode}
                handleModeChange={handleModeChange}
                searchedBook={mode === "add" ? searchedBook : null}
                editingBook={mode === "edit" ? editingBook : null}
              />
            }
          />
        </Routes>
      </Router>
    </SupabaseProvider>
  );
};

export default App;
