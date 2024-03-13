import React, { useEffect } from "react";
import { Book, NavLink } from "../types";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import BookCollection from "../components/BookCollection";

interface BooksReadPageProps {
  navLinks: NavLink[];
  books: Book[];
  handleDataFetch: () => Book[];
}

const BooksReadPage: React.FC<BooksReadPageProps> = ({
  navLinks,
  books,
  handleDataFetch,
}) => {
  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />
      <BookCollection
        handleDataFetch={handleDataFetch}
        books={books}
      />
    </section>
  );
};

export default BooksReadPage;
