import React, { FormEvent, useRef } from "react";
import useBooks from "../context/useBooks";
import { Book } from "../types";
import {
  fetchBookByIsbn,
  fetchBookByTitle,
  fetchBookByAuthor,
} from "../../../api/getBookDetails";


const AddForm: React.FC = () => {
  const { state, dispatch } = useBooks();
  const searchMethodRef = useRef<HTMLSelectElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const formData = {
    method: "",
    input: "",
    dateFinished: "",
  };

  const handleSearch = async (book: Book | null) => {
    dispatch({ type: "SET_SEARCHED_BOOK", payload: book });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // handleModeChange("add", undefined);

    if (searchMethodRef.current !== null) {
      formData.method = searchMethodRef.current.value;
    }
    if (searchInputRef.current !== null) {
      formData.input = searchInputRef.current.value;
    }
    if (dateRef.current !== null) {
      formData.dateFinished = dateRef.current.value;
    }

    // fetch by search method
    let newBook: Book | null = null;
    switch (formData.method) {
      case "isbn":
        newBook = await fetchBookByIsbn(formData.input);
        break;
      case "title":
        newBook = await fetchBookByTitle(formData.input);
        break;
      case "author":
        newBook = await fetchBookByAuthor(formData.input);
        break;
      default:
        console.log("invalid search method");
    }

    if (formData.method === "isbn") {
      newBook = await fetchBookByIsbn(formData.input);
    }

    if (newBook) {
      // add dateFinished to Book object
      const bookWithDate = { ...newBook, dateFinished: formData.dateFinished };
      // TODO: add key
      handleSearch(bookWithDate);

      // clear form data
      if (searchMethodRef.current)
        searchMethodRef.current.value = "Choose search method";
      if (searchInputRef.current) searchInputRef.current.value = "";
      dispatch({ type: "SET_DATE", payload: "" });
    } 
  };

  return (
    <form
      className="w-5/6 max-w-sm mx-auto py-28 snap-center md:max-w-md"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="searchMethod"
        className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white md:text-lg"
      >
        Choose search method
      </label>
      <select
        name=""
        id="searchMethod"
        className="bg-orange-100 border border-orange-200 text-purple-700 text-sm tracking-wide rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 mb-8 md:text-lg"
        ref={searchMethodRef}
      >
        <option defaultValue="">Choose search method</option>
        <option value="isbn">ISBN</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>

      <label
        htmlFor="searchInput"
        className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white md:text-lg"
      >
        Book detail
      </label>
      <input
        type="text"
        ref={searchInputRef}
        name=""
        id="searchInput"
        className="block mb-8 p-2.5 bg-orange-100 border border-orange-200 text-gray-900 text-sm tracking-wide rounded-lg w-full placeholder:text-purple-500 focus:ring-purple-300 focus:border-purple-300 md:text-lg"
        placeholder="ISBN / Title / Author"
      />

      <label
        htmlFor="dateFinished"
        className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white md:text-lg"
      >
        Date Finished
      </label>
      <input
        type="date"
        ref={dateRef}
        value={state.date}
        onChange={(e) => dispatch({ type: "SET_DATE", payload: e.target.value })}
        className="block mb-8 p-2.5 bg-orange-100 border border-orange-200 text-gray-900 text-sm tracking-wide rounded-lg w-full placeholder:text-purple-500 focus:ring-purple-300 focus:border-purple-300 md:text-lg"
      />

      <button
        type="submit"
        className="focus:outline-none text-purple-100 bg-orange-gradient hover:bg-yellow-500 focus:ring-4 focus:ring-purple-500 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 hover:bg-active-gradient md:text-lg"
      >
        Check book
      </button>
    </form>
  );
};

export default AddForm;
