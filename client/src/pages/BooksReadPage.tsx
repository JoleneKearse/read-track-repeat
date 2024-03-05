import React, { useEffect, useState } from "react";
import { Book, NavLink } from "../types";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import BookCollection from "../components/BookCollection";

interface BooksReadPageProps {
  navLinks: NavLink[];
  books: Book[];
  setBooks: (books: Book[]) => void;
  handleDataFetch: () => void;
  // sortBooksByDateFinished: (books: Book[]) => void;
}

const BooksReadPage: React.FC<BooksReadPageProps> = ({
  navLinks,
  books,
  handleDataFetch,
  // setBooks,
}) => {
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);

  const sortBooksByDateFinished = (books: Book[]) => {
    const sortedBooks = [...books].sort((a, b) => {
      const dateA = new Date(a.date_finished);
      const dateB = new Date(b.date_finished);

      return dateB.getTime() - dateA.getTime();
    });
    return sortedBooks;
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  useEffect(() => {
    const sorted = sortBooksByDateFinished(books);
    setSortedBooks(sorted);
  }, [books]);

  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />
      {books && (
        <BookCollection books={books} handleDataFetch={handleDataFetch} sortedBooks={sortedBooks} />
      )}
    </section>
  );
};

export default BooksReadPage;
