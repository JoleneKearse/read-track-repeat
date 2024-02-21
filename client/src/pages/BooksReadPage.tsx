import React from "react";
import Header from "../components/Header";
import { Book } from "../types";

interface BooksReadPageProps {
  books: Book[];
}

const BooksReadPage: React.FC<BooksReadPageProps> = () => {
  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      {books && (
        <BookCollection books={books} />
      )}
    </section>
  )
}

export default BooksReadPage