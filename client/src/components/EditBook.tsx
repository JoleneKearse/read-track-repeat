import React, { FormEvent, useRef, useState, useEffect } from "react";
import { Book } from "../types";
import Cover from "/cover.svg";
import Cross from "/cross.svg";
import Check from "/check.svg";
import useBooks from "../context/useBooks";

interface EditBookProps {
	handleConfirmBook: (book: Book) => void;
	handleEditBook: (book: Book) => void;
}

const EditBook: React.FC<EditBookProps> = ({ handleConfirmBook, handleEditBook }) => {
	const { state, dispatch } = useBooks();
	const coverImageUrlRef = useRef<HTMLInputElement>(null);
	const titleRef = useRef<HTMLInputElement>(null);
	const authorRef = useRef<HTMLInputElement>(null);
	const pagesRef = useRef<HTMLInputElement>(null);
	const publishedRef = useRef<HTMLInputElement>(null);
	const dateFinishedRef = useRef<HTMLInputElement>(null);
	const currentBook: Book = (state.searchedBook || state.editingBook) as Book;
	const [coverImageUrl, setCoverImageUrl] = useState<string>(currentBook.cover_img_url || "");

	useEffect(() => {
		setCoverImageUrl(currentBook.cover_img_url || "");
	}, [currentBook])

	const handleCancelBook = () => {
		if (state.searchedBook) {
			setTimeout(() => {
				dispatch({ type: "SET_SEARCHED_BOOK", payload: null });
			}, 500);
		}
		dispatch({ type: "SET_SEARCHED_BOOK", payload: null });
		dispatch({ type: "SET_IS_EDITING", payload: false });
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		const updatedBook: Book = {
			coverImageUrl:
				coverImageUrl,
				// coverImageUrlRef.current?.value || currentBook.coverImageUrl,
			title: titleRef.current?.value || currentBook.title,
			author: authorRef.current?.value || currentBook.author,
			pages: pagesRef.current?.value
				? parseInt(pagesRef.current.value)
				: currentBook.pages,
			published: publishedRef.current?.value || currentBook.published,
			dateFinished: currentBook.dateFinished,
		};
		dispatch({ type: "SET_MODE", payload: "edit" });

		if (state.isEditing) {
			console.log("clicked edit book")
			handleEditBook(updatedBook);
		} else if (!state.isEditing) {
			handleConfirmBook(updatedBook);
		}
		
	};

	return (
		<form
			className="w-5/6 max-w-sm py-32 mx-auto snap-center md:max-w-md"
			onSubmit={handleSubmit}
		>
			{currentBook && (
				<article
					key={currentBook?.id || 1}
					className="flex flex-col items-center justify-center p-6 border border-orange-200 rounded-lg shadow-lg shadow-orange-200a bg-overlay"
				>
					<h2 className="pb-6 text-2xl font-bold tracking-wide text-orange-200">
						Finalize your book's info
					</h2>
					<p className="pb-16 text-base tracking-wide text-orange-200">
						Edit any of the{" "}
						<span className="px-1 font-bold text-orange-200 rounded bg-purple-100a">
							info
						</span>{" "}
						that's missing or not quite right.
					</p>

					{/* CURRENT INFO */}

					{currentBook.coverImageUrl && (
						<>
							<img
								src={(currentBook.cover_img_url || Cover) as string}
								alt={currentBook.title}
								className="w-3/4 pt-8 pb-10"
							/>
							<p className="pb-4 text-base italic font-light tracking-wide text-orange-200">
								Not the book cover you were expecting? Click the help button to
								find the one you want.
							</p>
						</>
					)}
					<div className="w-full py-2">
						<div className="flex justify-center">
							<img
								src={currentBook.cover_img_url as string}
								alt={currentBook.title}
							/>
						</div>
						<label
							htmlFor="coverImgInput"
							className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white md:text-lg"
						>
							Change the cover image
						</label>
						<input
							type="text"
							ref={coverImageUrlRef}
							value={currentBook.cover_img_url as string}
							id="coverImgInput"
							className="block w-full px-2.5 mb-8 text-sm tracking-wide text-orange-200 rounded-lg bg-orange-100a placeholder:text-purple-200 focus:ring-purple-300 focus:border-purple-300 md:text-lg"
							placeholder="link with 'amazon' and some gibberish"
							onChange={(e) => setCoverImageUrl(e.target.value)} 
						/>
					</div>

					<div className="w-full py-2">
						{currentBook.title && (
							<>
								<label className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white md:text-lg">
									Edit title or add series for easier searching
								</label>
								<input
									type="text"
									ref={titleRef}
									id="titleInput"
									className="block mb-8 px-2.5 bg-orange-100a text-orange-300 text-sm tracking-wide rounded-lg w-full placeholder:text-orange-200 font-bold focus:ring-purple-300 focus:border-purple-300 md:text-lg"
									defaultValue={currentBook.title}
								/>
								<p className="block pb-4 pl-1 -mt-8 text-xl italic font-light tracking-wide text-orange-200 text-balance">
									Ex: Eloquent JavaScript: 4th edition
								</p>
							</>
						)}
					</div>

					<div className="w-full py-2">
						{currentBook.author && (
							<>
								<label
									htmlFor="authorInput"
									className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white md:text-lg"
								>
									Author(s)
								</label>
								<input
									type="text"
									ref={authorRef}
									id="authorInput"
									className="block mb-8 px-2.5 bg-orange-100a text-orange-300 text-sm tracking-wide rounded-lg w-full placeholder:text-orange-200 font-bold focus:ring-purple-300 focus:border-purple-300 md:text-lg"
									defaultValue={currentBook.author}
								/>
							</>
						)}
					</div>

					<div className="w-full py-2">
						{currentBook.published && (
							<>
								<label
									htmlFor="authorInput"
									className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white md:text-lg"
								>
									Published date
								</label>
								<input
									type="text"
									ref={publishedRef}
									id="authorInput"
									className="block mb-8 px-2.5 bg-orange-100a text-orange-300 text-sm tracking-wide rounded-lg w-full placeholder:text-orange-200 font-bold focus:ring-purple-300 focus:border-purple-300 md:text-lg"
									defaultValue={currentBook.published}
								/>
							</>
						)}
					</div>

					<div className="w-full py-2">
						<label
							htmlFor="pagesInput"
							className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white md:text-lg"
						>
							Number of pages
						</label>
						<input
							type="text"
							ref={pagesRef}
							id="pagesInput"
							className="block mb-8 px-2.5 bg-orange-100a text-orange-300 text-sm tracking-wide rounded-lg w-full placeholder:text-orange-200 font-bold focus:ring-purple-300 focus:border-purple-300 md:text-lg"
							defaultValue={currentBook.pages}
						/>
					</div>

					<div className="w-full py-2">
						{currentBook.dateFinished && (
							<>
								<label
									htmlFor="authorInput"
									className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white md:text-lg"
								>
									Date finished
								</label>
								<input
									type="text"
									ref={dateFinishedRef}
									id="dateFinishedInput"
									className="block mb-8 px-2.5 bg-orange-100a text-orange-300 text-sm tracking-wide rounded-lg w-full placeholder:text-orange-200 font-bold focus:ring-purple-300 focus:border-purple-300 md:text-lg"
									defaultValue={currentBook.dateFinished}
								/>
							</>
						)}
					</div>

					<div className="flex justify-center items-center pt-10 pb-8 ml-[2.25rem] md:ml-[4rem]">
						<button
							type="button"
							onClick={() => handleCancelBook()}
						>
							<img
								src={Cross}
								alt="cross"
								title="Not my book"
								className="w-1/3 hover:border hover:border-purple-300 hover:border-4 hover:rounded-full"
							/>
						</button>
						<button
							type="submit"
							onClick={handleSubmit}
							className="flex flex-col items-center justify-center py-10"
						>
							<img
								src={Check}
								alt="check"
								title="Update"
								className="w-1/3 hover:border hover:border-purple-300 hover:border-4 hover:rounded-full"
							/>
						</button>
					</div>
				</article>
			)}
		</form>
	);
};

export default EditBook;
