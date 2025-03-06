import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
	const navigate = useNavigate();

	const [isBookInLibrary, setIsBookInLibrary] = useState(false);

	// send to search page if book is in library
	useEffect(() => {
    if (isBookInLibrary && state.searchedBook) {
        localStorage.setItem("searchedBook", JSON.stringify(state.searchedBook));
        navigate("/bookSearch", { state: { searchedBook: state.searchedBook } });
    }
}, [isBookInLibrary, navigate, state.searchedBook]);


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
				<AddForm setIsBookInLibrary={setIsBookInLibrary} />
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
