import React from "react";

import { Book, NavLink } from "../types";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

interface BooksSearchPageProps {
  navLinks: NavLink[];
  books: Book[];
}

const BooksSearchPage: React.FC<BooksSearchPageProps> = ({
  navLinks,
  books,
}) => {
  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />
    </section>
  );
};

export default BooksSearchPage;
