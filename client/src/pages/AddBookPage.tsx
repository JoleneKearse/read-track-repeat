import { useRef, useEffect } from "react";

import { Book, NavLink } from "../types";
import useBooks from "../context/useBooks";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import AddForm from "../components/AddForm";
import EditBook from "../components/EditBook";

interface AddBookPageProps {
	navLinks: NavLink[];
	handleConfirmBook: (book: Book) => void;
	handleEditBook: (book: Book) => void;
}

const AddBookPage: React.FC<AddBookPageProps> = ({
	navLinks,
	handleConfirmBook,
	handleEditBook,
}) => {
	const { state } = useBooks();
	const searchResultsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (searchResultsRef.current && state.searchedBook) {
			searchResultsRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [state.searchedBook]);

	return (
		<section className="min-h-screen bg-bg-gradient snap-y">
			<div className="py-10">
				<Header />
				<NavBar navLinks={navLinks} />
			</div>
			<main>
				<AddForm />
				<div ref={searchResultsRef}>
					{state.searchedBook && (
						<EditBook
							handleEditBook={handleEditBook}
							handleConfirmBook={handleConfirmBook}
						/>
					)}
				</div>
			</main>
		</section>
	);
};

export default AddBookPage;
