import { useContext } from "react";
import BooksContext from "./BookContext";

const useBooks = () => {
	const context = useContext(BooksContext);
	if (!context) {
		throw new Error("useBooks must be used within a BooksProvider");
	}
	return context;
};

export default useBooks;