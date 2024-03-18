import React, { useState, useRef, useEffect } from "react";

import { Book, NavLink } from "../types";
import { useSupabase } from "../context/SupabaseContext";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SearchBooks from "../components/SearchBooks";
import FilteredBooks from "../components/FilteredBooks";
import { PostgrestError } from "@supabase/supabase-js";

interface BooksSearchPageProps {
  navLinks: NavLink[];
  books: Book[];
}

const BooksSearchPage: React.FC<BooksSearchPageProps> = ({ navLinks }) => {
  const supabase = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const filteredBooksRef = useRef<HTMLDivElement>(null);

  const handleSearchResponse = (
    data: Book[] | null,
    error: PostgrestError | null
  ) => {
    if (error) {
      console.log("Error:", error);
      return [];
    } else {
      setFilteredBooks(data);
    }
    return filteredBooks;
  };

  const searchBooksByTitle = async (title: string) => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .ilike("title", `%${title}%`)
      .order("date_finished", { ascending: false });

    return handleSearchResponse(data, error);
  };

  const searchBooksByAuthor = async (author: string) => {
    let query = supabase.from("books").select("*");
    const [firstName, ...rest] = author.split(" ");
    const lastName = rest.pop();

    const authorPattern = lastName
      ? `%${firstName}%${lastName ? `%${lastName}` : ""}%`
      : `%${firstName}%`;

    query = query
      .ilike("author", authorPattern)
      .order("date_finished", { ascending: false });

    const { data, error } = await query;

    return handleSearchResponse(data, error);
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

    return handleSearchResponse(data, error);
  };

  const handleSearch = async (method: string, input: string) => {
    // TODO: Figure out why this is working in setTimeout by not by itself
    setTimeout(() => {
      setLoading(true);
    }, 500);

    // setLoading(true);
    switch (method) {
      case "year":
        await searchBooksByYear(input);
        break;
      case "title":
        await searchBooksByTitle(input);
        break;
      case "author":
        await searchBooksByAuthor(input);
        break;
      default:
        console.log("invalid search parameters");
        break;
    }
    setLoading(false);
  };

  useEffect(() => {
    if (filteredBooksRef.current && filteredBooks.length > 0) {
      filteredBooksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [filteredBooks]);

  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />
      <SearchBooks handleSearch={handleSearch} />
      <div ref={filteredBooksRef}>
        {loading && <FilteredBooks filteredBooks={filteredBooks} />}
      </div>
    </section>
  );
};
export default BooksSearchPage;
