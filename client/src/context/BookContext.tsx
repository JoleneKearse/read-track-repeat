import React, { createContext, useReducer, ReactNode } from "react";
import { Book } from "../types";

type State = {
	searchedBook: Book | null;
	books: Book[];
	bookNotFound: boolean;
	date: string;
	isEditing: boolean;
	editingBook: Book | null;
	mode: "add" | "edit";
};
type Action =
	| { type: "SET_SEARCHED_BOOK"; payload: Book | null }
	| { type: "SET_BOOKS"; payload: Book[] }
	| { type: "SET_BOOK_NOT_FOUND"; payload: boolean }
	| { type: "SET_DATE"; payload: string }
	| { type: "SET_IS_EDITING"; payload: boolean }
	| { type: "SET_EDITING_BOOK"; payload: Book | null }
	| { type: "SET_MODE"; payload: "add" | "edit" };

const initialState: State = {
	searchedBook: null,
	books: [],
	bookNotFound: false,
	date: "",
	isEditing: false,
	editingBook: null,
	mode: "add",
};

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "SET_SEARCHED_BOOK":
			return { ...state, searchedBook: action.payload };
		case "SET_BOOKS":
			return { ...state, books: action.payload };
		case "SET_BOOK_NOT_FOUND":
			return { ...state, bookNotFound: action.payload };
		case "SET_DATE":
			return { ...state, date: action.payload };
		case "SET_IS_EDITING":
			return { ...state, isEditing: action.payload };
		case "SET_EDITING_BOOK":
			return { ...state, editingBook: action.payload };
		case "SET_MODE":
			return { ...state, mode: action.payload };
		default:
			return state;
	}
}

const BooksContext = createContext<{
	state: State;
	dispatch: React.Dispatch<Action>;
} | null>(null);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<BooksContext.Provider value={{ state, dispatch }}>
			{children}
		</BooksContext.Provider>
	);
};

export default BooksContext;