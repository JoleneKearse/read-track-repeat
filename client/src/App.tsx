import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SupabaseProvider, useSupabase } from "./context/SupabaseContext";

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

	const [searchedBook, setSearchedBook] = useState<Book | null>(null);
	const [books, setBooks] = useState<Book[]>([]);
	const [bookNotFound, setBookNotFound] = useState(false);
	const [date, setDate] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [editingBook, setEditingBook] = useState<Book | null>(null);
	const [mode, setMode] = useState<"add" | "edit">("add");

	const supabase = useSupabase();

	const handleAddBook = useCallback(
		(newBook: Book) => {
			setBooks([...books, newBook]);
		},
		[books]
	);

	const handleConfirmBook = useCallback(
		async (book: Book) => {
			if (book) {
				const bookToInsert: Database["public"]["Tables"]["books"]["Insert"] = {
					title: book.title,
					// @ts-expect-error: author could be undefined
					author: book.author,
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
					const addedBook = data;
					handleAddBook(addedBook);
					console.log("Data:", data);
				}
				setSearchedBook(null);
				setIsEditing(false);
				handleModeChange("add", undefined);
			}
		},
		[handleAddBook, supabase]
	);

	const handleCancelBook = () => {
		if (searchedBook!) {
			setTimeout(() => {
				setSearchedBook(null);
			}, 500);
		}
		setSearchedBook(null);
		setIsEditing(false);
	};

	const handleSearch = async (book: Book | null) => {
		setSearchedBook(book);
	};

	const handleDataFetch = useCallback(async () => {
		const { data, error } = await supabase
			.from("books")
			.select("*")
			.order("date_finished", { ascending: false });
		if (error) {
			console.log("Error:", error);
		} else {
			// @ts-expect-error: date could be undefined// @ts-expect-error: date could be undefined
			setBooks(data);
		}
	}, [supabase]);

	const handleEditBook = useCallback(
		async (book: Book) => {
			setIsEditing(true);
			setEditingBook(book!);

			if (book! && book.id) {
				const updatedBook = {
					title: book.title,
					author: book.author,
					published: book.published || null,
					pages: book.pages || null,
					cover_img_url: book.cover_img_url || null,
					date_finished: book.date_finished || null,
				};
				const { data, error } = await supabase
					.from("books")
					.update(updatedBook)
					.eq("id", book.id);

				if (error) {
					console.log("Error:", error);
				} else if (data) {
					handleSubmit(book);
				}
			}
			// TODO: This allowed the EditBook component to render when commented out.  But now I can't switch back to add mode.
			setIsEditing(false);
		},
		[supabase]
	);

	const handleSubmit = useCallback(
		(updatedBook: Book) => {
			if (updatedBook) {
				if (mode === "add") {
					console.log("adding new book", updatedBook);
					handleConfirmBook(updatedBook);
				} else if (mode === "edit") {
					handleEditBook(updatedBook);
				}
			} else {
				console.log("no updated book");
			}
		},
		[mode, handleConfirmBook, handleEditBook]
	);

	const handleModeChange = useCallback(
		(newMode: "add" | "edit", book?: Book) => {
			console.log("🐽2️⃣ Changing mode to:", newMode);
			console.trace();
			setMode(newMode);
			// if (book) {
			// 	setEditingBook(book);
			// }
			if (newMode === "edit" && book) {
				setEditingBook(book);
				handleEditBook(book);
			}
		},
		[setMode, setEditingBook, handleEditBook]
	);

	return (
		<SupabaseProvider>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<AddBookPage
								books={books}
								handleAddBook={handleAddBook}
								navLinks={navLinks}
								handleCancelBook={handleCancelBook}
								handleConfirmBook={handleConfirmBook}
								handleSearch={handleSearch}
								bookNotFound={bookNotFound}
								setEditingBook={setEditingBook}
								setBookNotFound={setBookNotFound}
								handleEditBook={handleEditBook}
								isEditing={isEditing}
								setIsEditing={setIsEditing}
								onSubmit={handleSubmit}
								searchedBook={mode === "add" ? searchedBook : null}
								editingBook={mode === "edit" ? editingBook : null}
								mode={mode}
								handleModeChange={handleModeChange}
								date={date}
								setDate={setDate}
							/>
						}
					/>
					<Route
						path="/booksRead"
						element={
							<BooksReadPage
								navLinks={navLinks}
								books={books}
								handleDataFetch={handleDataFetch}
								handleEditBook={handleEditBook}
								handleCancelBook={handleCancelBook}
								handleConfirmBook={handleConfirmBook}
								isEditing={isEditing}
								setIsEditing={setIsEditing}
								setEditingBook={setEditingBook}
								// searchedBook={mode === "add" ? searchedBook : null}
								editingBook={mode === "edit" ? editingBook : null}
								mode={mode}
								handleModeChange={handleModeChange}
								// onSubmit={handleSubmit}
							/>
						}
					/>
					<Route
						path="/bookSearch"
						element={
							<BooksSearchPage
								navLinks={navLinks}
								books={books}
								// handleDataFetch={handleDataFetch}
								handleEditBook={handleEditBook}
								handleCancelBook={handleCancelBook}
								handleConfirmBook={handleConfirmBook}
								isEditing={isEditing}
								setIsEditing={setIsEditing}
								// editingBook={editingBook}
								setEditingBook={setEditingBook}
								mode={mode}
								setMode={setMode}
								handleModeChange={handleModeChange}
								// searchedBook={mode === "add" ? searchedBook : null}
								editingBook={mode === "edit" ? editingBook : null}
								// onSubmit={handleSubmit}
							/>
						}
					/>
				</Routes>
			</Router>
		</SupabaseProvider>
	);
};

export default App;
