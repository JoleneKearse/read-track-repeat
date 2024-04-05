import React, { useEffect } from "react";
import { Book, NavLink } from "../types";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import BookCollection from "../components/BookCollection";
import EditBook from "../components/EditBook";

interface BooksReadPageProps {
  navLinks: NavLink[];
  books: Book[];
  handleDataFetch: () => Book[];
  handleEditBook: (book: Book) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  editingBook: Book | null;
  setEditingBook: (editedBook: Book | null) => void;
}

const BooksReadPage: React.FC<BooksReadPageProps> = ({
  navLinks,
  books,
  handleDataFetch,
  handleEditBook,
  isEditing,
  setIsEditing,
  editingBook,
  setEditingBook,
}) => {
  useEffect(() => {
    handleDataFetch();
  }, []);

  useEffect(() => {
    setIsEditing(true);
    setEditingBook(editingBook)
  }, [isEditing]);

  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />

      {isEditing && editingBook ? (
        <EditBook
          searchedBook={searchedBook}
          handleEditBook={handleEditBook}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editingBook={editingBook}
          setEditingBook={setEditingBook}
        />
      ) : (
        <BookCollection handleDataFetch={handleDataFetch} books={books} />
      )}
    </section>
  );
};

export default BooksReadPage;
