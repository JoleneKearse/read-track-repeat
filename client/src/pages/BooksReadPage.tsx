import React, { useEffect } from "react";
import { Book, NavLink } from "../types";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import BookCollection from "../components/BookCollection";
import EditBook from "../components/EditBook";

interface BooksReadPageProps {
	navLinks: NavLink[];
	books: Book[];
	handleDataFetch: () => void;
	handleEditBook: (book: Book) => void;
	isEditing: boolean;
	setIsEditing: (isEditing: boolean) => void;
	editingBook: Book | null;
	setEditingBook: (editedBook: Book | null) => void;
	handleCancelBook: (book: Book) => void;
	handleConfirmBook: (book: Book) => void;
	mode: "add" | "edit";
	handleModeChange: (newMode: "add" | "edit", book?: Book) => void;
}

const BooksReadPage: React.FC<BooksReadPageProps> = ({
	navLinks,
	books,
	handleDataFetch,
	handleEditBook,
	isEditing,
	setIsEditing,
	editingBook,
	setEditingBook,
	handleCancelBook,
	handleConfirmBook,
	mode,
	handleModeChange,
}) => {
	useEffect(() => {
		handleDataFetch();
	}, [books, handleDataFetch]);

	useEffect(() => {
		console.log("BooksReadPage - isEditing:", isEditing);
		console.log("BooksReadPage - editingBook:", editingBook);
	}, [isEditing, editingBook]);

	return (
		<section className="min-h-screen bg-bg-gradient">
			<Header />
			<NavBar navLinks={navLinks} />

			{isEditing && editingBook ? (
				<EditBook
					searchedBook={mode === "edit" ? editingBook : null}
					editingBook={editingBook}
					handleEditBook={handleEditBook}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
					setEditingBook={setEditingBook}
					mode={mode}
					handleModeChange={handleModeChange}
					handleCancelBook={handleCancelBook}
					handleConfirmBook={handleConfirmBook}
				/>
			) : (
				<BookCollection
					handleDataFetch={handleDataFetch}
					books={books}
					setIsEditing={setIsEditing}
					setEditingBook={setEditingBook}
					mode={mode}
					handleEditBook={handleEditBook}
					handleModeChange={handleModeChange}
				/>
			)}
		</section>
	);
};

export default BooksReadPage;
