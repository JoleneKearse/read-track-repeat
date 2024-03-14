import React, { useState } from "react";

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
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

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
    // account for middle initial 
    if (author.split(" ").length > 2) {
      const [first, _, last] = author.split(" ");
      query = query.ilike("author", `%${first}%${last}%`)
    } else {
      query = query.ilike("author", `%${author}%`)
    }

    query = query.order("date_finished", { ascending: false });
    
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
  };

  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />
      <SearchBooks handleSearch={handleSearch} />
      <FilteredBooks filteredBooks={filteredBooks} />
    </section>
  );
};
export default BooksSearchPage;
