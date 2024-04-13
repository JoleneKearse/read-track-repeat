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
  handleCancelBook: () => void;
  handleConfirmBook: () => void;
  onSubmit: (book: Book) => void;
  mode: "add" | "edit";
  setMode: (mode: "add" | "edit") => void;
  handleModeChange: (newMode: "add" | "edit", book?: Book) => void;
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
  handleCancelBook,
  handleConfirmBook,
  mode,
  setMode,
  handleModeChange,
  onSubmit,
}) => {
  useEffect(() => {
    handleDataFetch();
  }, []);

  useEffect(() => {
    console.log("isEditing changed in BooksReadPage", isEditing);
    // console.log(editingBook);
  }, [isEditing]);

  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />

      {isEditing && editingBook ? (
        <EditBook
          searchedBook={null}
          editingBook={editingBook}
          handleEditBook={handleEditBook}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setEditingBook={setEditingBook}
          onSubmit={handleEditBook}
          mode="add"
          handleModeChange={handleModeChange}
          onSubmit={onSubmit}
        />
      ) : (
        <BookCollection
          handleDataFetch={handleDataFetch}
          books={books}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editingBook={editingBook}
          setEditingBook={setEditingBook}
          handleEditBook={handleEditBook}
          mode="add"
          handleModeChange={handleModeChange}
          onSubmit={onSubmit}
        />
      )}
    </section>
  );
};

export default BooksReadPage;
