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
}

const BooksSearchPage: React.FC<BooksSearchPageProps> = ({
  navLinks,
  books,
  handleDataFetch,
}) => {
  useEffect(() => {
    handleDataFetch();
  }, []);

  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const handleSearch = (method: string, input: string) => {
    let filtered: Book[] = [];
    // set search method
    switch (method) {
      case "year":
        filtered = books.filter((book) => book.date_finished.includes(input));
        console.log(filtered);
        break;
      case "title":
        filtered = books.filter((book) =>
          book.title.toLowerCase().includes(input.toLowerCase())
        );
        console.log(filtered);
        break;
      case "author":
        filtered = books.filter((book) =>
          book.author.toLowerCase().includes(input.toLowerCase())
        );
        console.log(filtered);
        break;
      default:
        console.log("invalid search parameters");
        break;
    }
    setFilteredBooks(filtered);
  };

  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />
      <SearchBooks handleSearch={handleSearch} />
      {filteredBooks && <FilteredBooks filteredBooks={filteredBooks} />}
    </section>
  );
};

export default BooksSearchPage;
