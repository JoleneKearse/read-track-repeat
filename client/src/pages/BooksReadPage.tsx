import React, { useEffect } from "react";
import { Book, NavLink } from "../types";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import BookCollection from "../components/BookCollection";
import EditBook from "../components/EditBook";
import useBooks from "../context/useBooks";

interface BooksReadPageProps {
	navLinks: NavLink[];
	handleConfirmBook: (book: Book) => void;
	handleEditBook: (book: Book) => void;
	handleDataFetch: () => void;
}

const BooksReadPage: React.FC<BooksReadPageProps> = ({
	navLinks,
	handleConfirmBook,
	handleEditBook,
	handleDataFetch
}) => {
	const { state } = useBooks(); 

	useEffect(() => {
		handleDataFetch();
	}, [handleDataFetch]);

	return (
		<section className="min-h-screen bg-bg-gradient">
			<Header />
			<NavBar navLinks={navLinks} />

			{state.isEditing && state.editingBook ? (
				<EditBook
					handleConfirmBook={handleConfirmBook}
					handleEditBook={handleEditBook}
				/>
			) : (
				<BookCollection />
			)}
		</section>
	);
};

export default BooksReadPage;
