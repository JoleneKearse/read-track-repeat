import React, { useState, useEffect } from "react";

import { Book, NavLink } from "../types";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SearchBooks from "../components/SearchBooks";
import FilteredBooks from "../components/FilteredBooks";

interface BooksSearchPageProps {
  navLinks: NavLink[];
  books: Book[];
  handleDataFetch: () => void;
  sortBooksByDateFinished: (books: Book[]) => void;
  setSortedBooks: (books: Book[]) => void;
  sortedBooks: Book[];
}

const BooksSearchPage: React.FC<BooksSearchPageProps> = ({
  navLinks,
  books,
  handleDataFetch,
  sortBooksByDateFinished,
  setSortedBooks,
}) => {
  useEffect(() => {
    handleDataFetch();
  }, []);

  useEffect(() => {
    const sorted: Book[] = sortBooksByDateFinished(books);
    setSortedBooks(sorted);
  }, [books]);

  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const handleSearch = (method: string, input: string) => {
    let filtered: Book[] = [];
    // set search method
    switch (method) {
      case "year":
        filtered = books.filter((book) => book.date_finished.includes(input));
        break;
      case "title":
        filtered = books.filter((book) =>
          book.title.toLowerCase().includes(input.toLowerCase())
        );
        break;
      case "author":
        filtered = books.filter((book) =>
          book.author.toLowerCase().includes(input.toLowerCase())
        );
        break;
      default:
        console.log("invalid search parameters");
        break;
    }
    const sorted: Book[] | null = sortBooksByDateFinished(filtered);
    setFilteredBooks(sorted);
  };

  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />
      <SearchBooks handleSearch={handleSearch} />
      {filteredBooks && (
        <FilteredBooks
          filteredBooks={filteredBooks}
        />
      )}
    </section>
  );
};

export default BooksSearchPage;
