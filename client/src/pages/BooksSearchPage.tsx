import React, { useState, useEffect } from "react";

import { Book, NavLink } from "../types";
import { useSupabase } from "../context/SupabaseContext";
import { Database } from "../types/supabase";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SearchBooks from "../components/SearchBooks";
import FilteredBooks from "../components/FilteredBooks";

interface BooksSearchPageProps {
  navLinks: NavLink[];
  books: Book[];
  // handleDataFetch: () => void;
  searchBooksByYear: (books: Book[]) => void;
  setSortedBooks: (books: Book[]) => void;
  sortedBooks: Book[];
}

const BooksSearchPage: React.FC<BooksSearchPageProps> = ({
  navLinks,
  books,
  // handleDataFetch,
  searchBooksByYear,
  setSortedBooks,
}) => {
  // useEffect(() => {
  //   handleDataFetch();
  // }, []);

  //

  const supabase = useSupabase();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const searchBooksByTitle = async (title: string) => {
    const sortedBooks: Book[] = [];

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .ilike("title", `%${title}%`);

    if (error) {
      console.log("Error:", error);
      return [];
    } else {
      setFilteredBooks(data);
    }
    return filteredBooks;
  };

  const handleSearch = async (method: string, input: string) => {
    let filtered: Book[] = [];
    // set search method
    switch (method) {
      case "year":
        await searchBooksByYear(input);
        break;
      case "title":
        console.log(method);
        await searchBooksByTitle(input);
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
    // const sorted: Book[] | null = searchBooksByYear(filtered);
    // setFilteredBooks(sorted);
  };

  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />
      <SearchBooks handleSearch={handleSearch} />
      {filteredBooks.length >= 1 ? (
        <FilteredBooks filteredBooks={filteredBooks} />
      ) : (
        <p className="p-3 mb-10 text-3xl font-bold text-center text-purple-100 bg-orange-gradient">
          No results!
        </p>
      )}
    </section>
  );
};
export default BooksSearchPage;
