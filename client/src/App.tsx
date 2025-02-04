import React, { useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SupabaseProvider, useSupabase } from "./context/SupabaseContext";
import useBooks from "./context/useBooks";

import { Book, NavLink } from "./types";
import { Database } from "../src/types/supabase";

import AddBookPage from "./pages/AddBookPage";
import BooksReadPage from "./pages/BooksReadPage";
import BooksSearchPage from "./pages/BooksSearchPage";

// import User from "/user.svg";
import AddBook from "/addBook.svg";
import ViewBook from "/viewBook.svg";
import SearchBook from "/searchBook.svg";

const App: React.FC = () => {
	const navLinks: NavLink[] = [
		// {
		//   name: "User",
		//   path: "/user",
		//   icon: User,
		//   alt: "User",
		// },
		{
			name: "Add Book",
			path: "/",
			icon: AddBook,
			alt: "Add Book",
		},
		{
			name: "Collection",
			path: "/booksRead",
			icon: ViewBook,
			alt: "View Book Collection",
		},
		{
			name: "Search Book",
			path: "/bookSearch",
			icon: SearchBook,
			alt: "Search Books",
		},
	];
	const supabase = useSupabase();
	const { state, dispatch } = useBooks();

	const handleConfirmBook = async (book: Book) => {
		if (book) {
			const bookToInsert: Database["public"]["Tables"]["books"]["Insert"] = {
				title: book.title,
				author: book.author || null,
				published: book.published || null,
				pages: book.pages || null,
				cover_img_url: book.coverImageUrl || null,
				date_finished: book.dateFinished || null,
			};

			const { data, error } = await supabase
				.from("books")
				.insert([bookToInsert]);

			if (error) {
				console.log("Error:", error);
			} else if (data) {
				dispatch({ type: "SET_BOOKS", payload: [...state.books, ...data] });
				console.log("Data:", data);
			}

			dispatch({ type: "SET_SEARCHED_BOOK", payload: null });
			dispatch({ type: "SET_IS_EDITING", payload: false });
			dispatch({ type: "SET_MODE", payload: "add" });
			alert("Book added!");
		}
	};

	const handleDataFetch = useCallback(async () => {
		const { data, error } = await supabase
			.from("books")
			.select("*")
			.order("date_finished", { ascending: false });
		if (error) {
			console.log("Error:", error);
		} else {
			dispatch({ type: "SET_BOOKS", payload: data as Book[] });
		}
	}, [supabase, dispatch]);

	const handleEditBook = async (book: Book) => {
		dispatch({ type: "SET_IS_EDITING", payload: true });
		dispatch({ type: "SET_EDITING_BOOK", payload: book });

		if (book && book.id) {
			const updatedBook = {
				title: book.title,
				author: book.author,
				published: book.published ?? null,
				pages: book.pages ?? null,
				cover_img_url: book.coverImageUrl,
				date_finished: book.dateFinished,
			};

			const { data, error } = await supabase
				.from("books")
				.update(updatedBook)
				.eq("id", book.id)
				.select("*");

			if (error) {
				console.log("Error:", error);
			} else if (data) {
				console.log("Updated data:", data);
			}
		}

		dispatch({ type: "SET_IS_EDITING", payload: false });
		alert("Book updated!");
	};

	return (
		<SupabaseProvider>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<AddBookPage
								navLinks={navLinks}
								handleConfirmBook={handleConfirmBook}
								handleEditBook={handleEditBook}
							/>
						}
					/>
					<Route
						path="/booksRead"
						element={
							<BooksReadPage
								navLinks={navLinks}
								handleDataFetch={handleDataFetch}
								handleConfirmBook={handleConfirmBook}
								handleEditBook={handleEditBook}
							/>
						}
					/>
					<Route
						path="/bookSearch"
						element={
							<BooksSearchPage
								navLinks={navLinks}
								handleConfirmBook={handleConfirmBook}
								handleEditBook={handleEditBook}
							/>
						}
					/>
				</Routes>
			</Router>
		</SupabaseProvider>
	);
};

export default App;
