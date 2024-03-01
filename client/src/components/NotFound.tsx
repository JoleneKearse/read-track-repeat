import React, { useRef, FormEvent } from "react";
import { Book } from "../types";
import NoBook from "/not-found.svg";
import Library from "/library.svg";

interface NotFoundProps {
  handleManuallyAddBook: (newBook: Book) => void;
  addBook: boolean;
  date: string;
}

const NotFound: React.FC<NotFoundProps> = ({
  handleManuallyAddBook,
  addBook,
  date
}) => {
  const formData = {
    title: "",
    author: "",
    dateFinished: "",
  };
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef({date});
  // const [date, setDate] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (titleRef.current !== null) {
      formData.title = titleRef.current.value;
    }
    if (authorRef.current !== null) {
      formData.author = authorRef.current.value;
    }
    if (dateRef.current !== null) {
      formData.dateFinished = dateRef.current.value;
    }
    const newBook: Book | null = formData;
    handleManuallyAddBook(newBook);
  };

  return (
    <section className="w-5/6 max-w-sm py-20 mx-auto md:max-w-md">
      <article className="flex flex-col items-center justify-center p-6 bg-purple-700 border border-orange-200 rounded-lg">
        {addBook ? (
          <>
            <img src={NoBook} alt="not found" />
            <p className="text-xl tracking-wide text-orange-100">
              Sorry, we couldn't find your book!
            </p>
            <p className="text-xl tracking-wide text-orange-100">
              But you can still add the details.
            </p>
          </>
        ) : (
          <>
            <img src={Library} alt="added to library" />
            <p className="text-xl tracking-wide text-orange-100">
              Added to your collection!
            </p>
          </>
        )}
      </article>

      {addBook && (
        <form
          className="w-5/6 max-w-sm mx-auto md:max-w-md"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="title"
            className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white"
          >
            Title
          </label>

          <input
            type="text"
            id="title"
            ref={titleRef}
            className="block mb-8 p-2.5 bg-orange-100 border border-orange-200 text-gray-900 text-sm tracking-wide rounded-lg w-full placeholder:text-purple-500 focus:ring-purple-300 focus:border-purple-300"
            placeholder="The Martian"
          />
          <label
            htmlFor="author"
            className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            ref={authorRef}
            className="block mb-8 p-2.5 bg-orange-100 border border-orange-200 text-gray-900 text-sm tracking-wide rounded-lg w-full placeholder:text-purple-500 focus:ring-purple-300 focus:border-purple-300"
            placeholder="Andy Weir"
          />

          <label
            htmlFor="dateFinished"
            className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white"
          >
            Date Finished
          </label>
          <input
            type="date"
            ref={dateRef}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block mb-8 p-2.5 bg-orange-100 border border-orange-200 text-gray-900 text-sm tracking-wide rounded-lg w-full placeholder:text-purple-500 focus:ring-purple-300 focus:border-purple-300"
          />

          <button
            type="submit"
            className="focus:outline-none text-purple-100 bg-orange-300 hover:bg-yellow-500 focus:ring-4 focus:ring-purple-500 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Add book
          </button>
        </form>
      )}
    </section>
  );
};

export default NotFound;
