import React, { useRef, useState, useEffect } from "react";
import { Book } from "../types";
import Edit from "/edit.svg";
import Cover from "/cover.svg";
import BackToTop from "/back-to-top.svg";
import useBooks from "../context/useBooks";
import Alert from "./Alert";

const BookCollection: React.FC = () => {
	const { state, dispatch } = useBooks();
	const bookCollectionRef = useRef<HTMLDivElement>(null);
	const [isBookCollectionVisible, setIsBookCollectionVisible] = useState(false);
	const alertMessage = "Updated!";

	const handleEditSubmit = (book: Book) => {
		dispatch({ type: "SET_IS_EDITING", payload: true });
		dispatch({ type: "SET_MODE", payload: "edit" });
		dispatch({ type: "SET_EDITING_BOOK", payload: book });
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsBookCollectionVisible(entry.isIntersecting);
			},
			{ threshold: 0 }
		);

		if (bookCollectionRef.current) {
			observer.observe(bookCollectionRef.current);
		}

		return () => {
			if (bookCollectionRef.current) {
				observer.unobserve(bookCollectionRef.current);
			}
		};
	}, [isBookCollectionVisible]);

	return (
		<>
			<p className="text-2xl font-bold tracking-wide text-center text-purple-200">
				{state.books.length} books tracked
			</p>
			{state.showAlert && (
				<Alert message={alertMessage} />
			)}
			<section
				ref={bookCollectionRef}
				className={`justify-center min-h-screen scroll snap-y  ${
					state.books.length <= 3
						? "lg:flex lg:gap-10"
						: "md:grid md:grid-cols-2 lg:grid-cols-4 md:h-auto md:py-64"
				}`}
			>
				{isBookCollectionVisible && (
					<button
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Go back to top."
            aria-label="Go back to top."
						className="fixed top-0 bottom-0 right-4 w-12 text-white rounded"
					>
						<img
							src={BackToTop}
							alt=""
              aria-hidden="true"
						/>
					</button>
				)}
				{state.books.map((book) => (
					<article
						key={book.id}
						className={`flex flex-col items-center justify-center flex-none w-3/4 p-4 mx-auto my-10 text-center bg-overlay border border-orange-200 rounded-lg shadow-lg shadow-orange-200a relative ${
							state.books.length <= 3 ? "lg:max-w-xs lg:max-h-[450px]" : ""
						}`}
					>
						<img
							src={book.cover_img_url ? book.cover_img_url : Cover}
							alt={book.title}
							className="w-2/5 pt-8 pb-10"
						/>
						<h3 className="text-2xl font-bold tracking-wide text-orange-200 text-balance">
							{book.title}
						</h3>
						<p className="text-xl tracking-wide text-orange-200 text-balance">
							{book.author}
						</p>
						{book.published && (
							<p className="text-base tracking-wide text-purple-100">
								Finished: {book.date_finished}
							</p>
						)}
						{book.pages && (
							<p className="pb-10 text-base tracking-wide text-purple-100">
								{book.pages} pages
							</p>
						)}
						<button
							type="button"
							onClick={() => handleEditSubmit(book)}
						>
							<img
								src={Edit}
								alt="Edit book info"
								title="Edit book info"
								className="absolute opacity-40 w-9 bottom-3 right-3 hover:opacity-75 hover:border hover:border-purple-300 hover:border-4 hover:rounded-full"
							/>
						</button>
					</article>
				))}
			</section>
		</>
	);
};

export default BookCollection;
