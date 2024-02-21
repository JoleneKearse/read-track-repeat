import React from "react";
import Header from "../components/Header";
import { Book } from "../types";

interface BooksReadPageProps {
  navLinks: NavLink[];
  books: Book[];
}

const BooksReadPage: React.FC<BooksReadPageProps> = ({ navLinks }) => {
  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      {books && (
        <BookCollection books={books} navLinks={navLinks} />
      )}
    </section>
  )
}

export default BooksReadPage