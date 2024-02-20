import React, { FormEvent, useRef } from "react";
import { Book } from "../types";
import fetchBook from "../../../api/getBookDetails";

interface AddFormProps {
  onAddBook: (newBook: Book) => void;
}

const AddForm: React.FC<AddFormProps> = ({ onAddBook }) => {
  const searchMethodRef = useRef<HTMLSelectElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const formData = {
    method: "",
    input: "",
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (searchMethodRef.current !== null) {
      formData.method = searchMethodRef.current.value;
    }
    if (searchInputRef.current !== null) {
      formData.input = searchInputRef.current.value;
    }
    // console.log(formData);
    // console.log(fetchBook(formData.input));
    const newBook: Book = await fetchBook(formData.input);
    console.log(newBook);
    onAddBook(newBook);
  };

  return (
    <form 
      className="w-5/6 max-w-sm mx-auto md:max-w-md" 
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="searchMethod"
        className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white"
      >
        Choose search method
      </label>
      <select
        name=""
        id="searchMethod"
        className="bg-orange-100 border border-orange-200 text-purple-700 text-sm tracking-wide rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 mb-8"
        ref={searchMethodRef}
      >
        <option defaultValue="">Choose search method</option>
        <option value="isbn">ISBN</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>

      <label
        htmlFor="searchInput"
        className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white"
      >
        Book detail
      </label>
      <input
        type="text"
        ref={searchInputRef}
        name=""
        id="searchInput"
        className="block mb-8 p-2.5 bg-orange-100 border border-orange-200 text-gray-900 text-sm tracking-wide rounded-lg w-full placeholder:text-purple-500 focus:ring-purple-300 focus:border-purple-300"
        placeholder="ISBN / Title / Author"
      />

      <button
        type="submit"
        className="focus:outline-none text-purple-100 bg-orange-300 hover:bg-yellow-500 focus:ring-4 focus:ring-purple-500 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
      >
        Add book
      </button>
    </form>
  );
};

export default AddForm;
