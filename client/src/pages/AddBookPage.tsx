// import { useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import AddForm from "../components/AddForm";
import ConfirmBook from "../components/ConfirmBook";
import { Book, NavLink } from "../types";

interface AddBookPageProps {
  navLinks: NavLink[];
  books: Book[];
  searchedBook: Book | null;
  handleAddBook: (newBook: Book) => void;
  handleCancelBook: () => void;
  handleConfirmBook: () => void;
  handleSearch: (book: Book) => void;
}

const AddBookPage: React.FC<AddBookPageProps> = ({ navLinks, handleCancelBook, handleConfirmBook, handleSearch, searchedBook }) => {
  
  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />
      <main>
        <AddForm onSearch={handleSearch} />
        {/* display ConfirmBook, once search is complete */}
        {searchedBook && (
          <ConfirmBook
            searchedBook={searchedBook}
            handleCancelBook={handleCancelBook}
            handleConfirmBook={handleConfirmBook}
            handleSearch={handleSearch}
          />
        )}
      </main>
    </section>
  );
};

export default AddBookPage;
