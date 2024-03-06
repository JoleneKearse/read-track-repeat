import React, { useEffect } from "react";
import { Book, NavLink } from "../types";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import BookCollection from "../components/BookCollection";

interface BooksReadPageProps {
  navLinks: NavLink[];
  books: Book[];
  handleDataFetch: () => void;
  sortBooksByDateFinished: (books: Book[]) => void;
  setSortedBooks: (books: Book[]) => void;
  sortedBooks: Book[];
}

const BooksReadPage: React.FC<BooksReadPageProps> = ({
  navLinks,
  books,
  handleDataFetch,
  sortBooksByDateFinished,
  setSortedBooks,
  sortedBooks,
}) => {
  useEffect(() => {
    handleDataFetch();
  }, []);

  useEffect(() => {
    const sorted: Book[] = sortBooksByDateFinished(books);
    setSortedBooks(sorted);
  }, [books]);

  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />
      {books && (
        <BookCollection
          handleDataFetch={handleDataFetch}
          sortedBooks={sortedBooks}
        />
      )}
    </section>
  );
};

export default BooksReadPage;
