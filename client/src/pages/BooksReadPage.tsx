import React from "react";
import { Book, NavLink } from "../types";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import BookCollection from "../components/BookCollection";

interface BooksReadPageProps {
  navLinks: NavLink[];
  books: Book[];
}

const BooksReadPage: React.FC<BooksReadPageProps> = ({ navLinks, books }) => {
  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />
      {books && (
        <BookCollection books={books} />
      )}
    </section>
  );
};

export default BooksReadPage;
