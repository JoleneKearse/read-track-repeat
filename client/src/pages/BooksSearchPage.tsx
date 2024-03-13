import React, { useState, useEffect } from "react";

import { Book, NavLink } from "../types";
import { useSupabase } from "../context/SupabaseContext";
// import { Database } from "../types/supabase";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SearchBooks from "../components/SearchBooks";
import FilteredBooks from "../components/FilteredBooks";

interface BooksSearchPageProps {
  navLinks: NavLink[];
  books: Book[];
}

const BooksSearchPage: React.FC<BooksSearchPageProps> = ({
  navLinks,
  books,
}) => {
  const supabase = useSupabase();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const searchBooksByTitle = async (title: string) => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .ilike("title", `%${title}%`)
      .order("date_finished", { ascending: false });

    if (error) {
      console.log("Error:", error);
      return [];
    } else {
      setFilteredBooks(data);
    }
    return filteredBooks;
  };

  const searchBooksByAuthor = async (author: string) => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .ilike("author", `%${author}%`)
      .order("date_finished", { ascending: false });

    if (error) {
      console.log("Error:", error);
      return [];
    } else {
      setFilteredBooks(data);
    }
    return filteredBooks;
  };

  const searchBooksByYear = async (year: string) => {
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .gte("date_finished", startDate)
      .lte("date_finished", endDate)
      .order("date_finished", { ascending: false });

    if (error) {
      console.error("Error:", error);
      return [];
    } else {
      setFilteredBooks(data);
    }

    return filteredBooks;
  };

  const handleSearch = async (method: string, input: string) => {
    switch (method) {
      case "year":
        await searchBooksByYear(input);
        break;
      case "title":
        console.log(method);
        await searchBooksByTitle(input);
        break;
      case "author":
        await searchBooksByAuthor(input);
        break;
      default:
        console.log("invalid search parameters");
        break;
    }
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
