import React, { useRef, FormEvent, useEffect } from "react";
import useBooks from "../context/useBooks";

interface SearchBooksProps {
	handleSearch: (method: string, input: string) => void;
}

const SearchBooks: React.FC<SearchBooksProps> = ({ handleSearch }) => {
	const sortingMethodRef = useRef<HTMLSelectElement>(null);
	const criteriaInputRef = useRef<HTMLInputElement>(null);
	const { state } = useBooks();

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		const method = sortingMethodRef.current?.value;
		const input = criteriaInputRef.current?.value;

		if (method && input) {
			handleSearch(method, input);
		}

		// clear form data
		if (sortingMethodRef.current)
			sortingMethodRef.current.value = "Choose sorting method";
		if (criteriaInputRef.current) criteriaInputRef.current.value = "";
	};

	const handleDirectSearch = () => {
		const method = sortingMethodRef.current?.value;
		const input = criteriaInputRef.current?.value;

		if (method && input) {
			handleSearch(method, input);
		}
	};

	useEffect(() => {
		if (
			criteriaInputRef.current &&
			state.searchedBook &&
			sortingMethodRef.current
		) {
			sortingMethodRef.current.value = "title";
			criteriaInputRef.current.value = state.searchedBook.title;
		}
		// Use the new function to handle the search directly
		setTimeout(() => handleDirectSearch(), 300);
	}, [state.searchedBook, handleDirectSearch]);

	return (
		<form
			className="w-5/6 max-w-sm py-32 mx-auto snap-center md:max-w-md"
			onSubmit={handleSubmit}
		>
			<label
				htmlFor="sortingMethod"
				className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white md:text-lg"
			>
				Choose sorting method
			</label>
			<select
				name=""
				id="sortingMethod"
				ref={sortingMethodRef}
				className="bg-orange-100 border border-orange-200 text-purple-700 text-sm tracking-wide rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 mb-8 md:text-lg"
			>
				<option defaultValue="">Choose sorting method</option>
				<option value="year">Year</option>
				<option value="title">Title</option>
				<option value="author">Author</option>
			</select>

			<label
				htmlFor="criteriaInput"
				className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white md:text-lg"
			>
				What are we searching for?
			</label>
			<input
				type="text"
				name=""
				id="criteriaInput"
				ref={criteriaInputRef}
				className="block mb-8 p-2.5 bg-orange-100 border border-orange-200 text-gray-900 text-sm tracking-wide rounded-lg w-full placeholder:text-purple-500 focus:ring-purple-300 focus:border-purple-300 md:text-lg"
				placeholder="2020 / The Martian / Andy Weir"
			/>

			<button
				type="submit"
				className="focus:outline-none text-purple-100 bg-orange-gradient hover:bg-yellow-500 focus:ring-4 focus:ring-purple-500 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 hover:bg-active-gradient md:text-lg"
			>
				Filter books
			</button>
		</form>
	);
};

export default SearchBooks;
