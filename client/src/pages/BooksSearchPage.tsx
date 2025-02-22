import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Book, NavLink } from "../types";
import { useSupabase } from "../context/SupabaseContext";
import { searchBooksByTitle, searchBooksByAuthor, handleSearchResponse } from "../utils/utils";
import useBooks from "../context/useBooks";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SearchBooks from "../components/SearchBooks";
import FilteredBooks from "../components/FilteredBooks";
import EditBook from "../components/EditBook";

interface BooksSearchPageProps {
	navLinks: NavLink[];
	handleConfirmBook: (book: Book) => void;
	handleEditBook: (book: Book) => void;
}

const BooksSearchPage: React.FC<BooksSearchPageProps> = ({
	navLinks,
	handleConfirmBook,
	handleEditBook,
}) => {
	const supabase = useSupabase();
	const { state } = useBooks();

	const location = useLocation();
	const searchedBook = location.state?.searchedBook || state.searchedBook;

	// const storedBook = localStorage.getItem("searchedBook");
	// const searchedBook = storedBook ? JSON.parse(storedBook) : null;

	const [loading, setLoading] = useState<boolean>(false);
	const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
	const filteredBooksRef = useRef<HTMLDivElement>(null);
	const [searchMethod, setSearchMethod] = useState<string>("");
	const [searchInput, setSearchInput] = useState<string>("");

	const searchBooksByYear = async (year: string) => {
		const startDate = `${year}-01-01`;
		const endDate = `${year}-12-31`;

		const { data, error } = await supabase
			.from("books")
			.select("*")
			.gte("date_finished", startDate)
			.lte("date_finished", endDate)
			.order("date_finished", { ascending: false });
		// @ts-expect-error: data could be undefined
		return handleSearchResponse(data, error);
	};

	const handleSearch = async (method: string, input: string) => {
		setLoading(true);

		let searchResults: Book[] = [];

		switch (method) {
			case "year":
				setSearchMethod("year");
				setSearchInput(input);
				searchResults = await searchBooksByYear(input);
				break;
			case "title":
				setSearchMethod("title");
				setSearchInput(input);
				searchResults = await searchBooksByTitle(supabase, input);
				break;
			case "author":
				setSearchMethod("author");
				setSearchInput(input);
				searchResults = await searchBooksByAuthor(supabase, input);
				break;
			default:
				console.log("invalid search parameters");
				break;
		}

		setFilteredBooks(searchResults);
		setTimeout(() => setLoading(false), 500);
	};

	useEffect(() => {
		if (filteredBooksRef.current && filteredBooks.length > 0) {
			filteredBooksRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [filteredBooks]);

	useEffect(() => {
    console.log("Searched Book received in BooksSearchPage:", searchedBook);
}, [searchedBook]);


	return (
		<section className="min-h-screen bg-bg-gradient">
			<Header />
			<NavBar navLinks={navLinks} />
			<SearchBooks handleSearch={handleSearch} />
			<div ref={filteredBooksRef}>
				{loading ? (
					<FilteredBooks
						filteredBooks={filteredBooks}
						searchMethod={searchMethod}
						searchInput={searchInput}
					/>
				) : state.isEditing && state.editingBook ? (
					<EditBook
						handleConfirmBook={handleConfirmBook}
						handleEditBook={handleEditBook}
					/>
				) : filteredBooks.length > 0 ? (
					<FilteredBooks
						filteredBooks={filteredBooks}
						searchMethod={searchMethod}
						searchInput={searchInput}
					/>
				) : null}
			</div>
		</section>
	);
};
export default BooksSearchPage;
