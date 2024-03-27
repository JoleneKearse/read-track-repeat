import React, { FormEvent, useRef } from "react";
import { Book } from "../types";
import Cover from "/cover.svg";
import Check from "/check.svg";

interface EditBookPageProps {
  searchedBook: Book;
  handleEditBook: () => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  handleConfirmBook: () => void;
}

const EditBook: React.FC<EditBookPageProps> = ({
  searchedBook,
  handleEditBook,
  isEditing,
  setIsEditing,
  handleConfirmBook,
}) => {
  const coverImageUrlRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const pagesRef = useRef<HTMLInputElement>(null);
  const publishedRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(`edit book: ${searchedBook}`);
  };

  return (
    <form
      className="w-5/6 max-w-sm py-32 mx-auto snap-center md:max-w-md"
      onSubmit={handleSubmit}
    >
      <article
        key={searchedBook.id | 1}
        className="flex flex-col items-center justify-center p-6 border border-orange-200 rounded-lg shadow-lg shadow-orange-200a bg-overlay"
      >
        <p className="text-xl font-bold tracking-wide text-orange-200">
          Fill out any missing data
        </p>
        <p className="pb-10 text-base tracking-wide text-orange-200">
          I'm sorry I couldn't get it all for you!
        </p>

        {/* CURRENT INFO */}
        {searchedBook.coverImageUrl ? (
          <img
            src={
              searchedBook.coverImageUrl ? searchedBook.coverImageUrl : Cover
            }
            alt={searchedBook.title}
            className="w-3/4 pt-8 pb-10"
          />
        ) : (
          <div className="w-full py-4">
            <label
              htmlFor="coverImgInput"
              className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white md:text-lg"
            >
              Copied cover image link
            </label>
            <input
              type="text"
              ref={coverImageUrlRef}
              id="coverImgInput"
              className="block mb-8 p-2.5 bg-orange-100 border border-orange-200 text-gray-900 text-sm tracking-wide rounded-lg w-full placeholder:text-purple-500 focus:ring-purple-300 focus:border-purple-300 md:text-lg"
              placeholder="https://m.media-amazon.com/images/G/15/apparel/rcxgs/tile._CB483369412_.gif"
            />
          </div>
        )}

        <div className="w-full py-4">
          <label
            htmlFor="titleInput"
            className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white md:text-lg"
          >
            Edit title or add series
          </label>
          <input
            type="text"
            ref={titleRef}
            id="titleInput"
            className="block mb-8 p-2.5 bg-orange-100 border border-orange-200 text-gray-900 text-sm tracking-wide rounded-lg w-full placeholder:text-purple-500 focus:ring-purple-300 focus:border-purple-300 md:text-lg"
            // placeholder="Wrath of a Mad God: Darkwar Saga Book 3"
            placeholder={`${searchedBook.title}: (series book number)`}
          />
        </div>

        {searchedBook.author ? (
          <p className="text-xl tracking-wide text-orange-200 text-balance">
            {searchedBook.author}
          </p>
        ) : (
          <div className="w-full py-4">
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
              className="block mb-8 p-2.5 bg-orange-100 border border-orange-200 text-gray-900 text-sm tracking-wide rounded-lg w-full placeholder:text-purple-500 focus:ring-purple-300 focus:border-purple-300 md:text-lg"
              placeholder="Stephen King, Nora Roberts"
            />
          </div>
        )}

        {searchedBook.published ? (
          <p className="text-base tracking-wide text-purple-100">
            Published: {searchedBook.published}
          </p>
        ) : (
          <div className="w-full py-4">
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
              className="block mb-8 p-2.5 bg-orange-100 border border-orange-200 text-gray-900 text-sm tracking-wide rounded-lg w-full placeholder:text-purple-500 focus:ring-purple-300 focus:border-purple-300 md:text-lg"
              placeholder="1999-12-31"
            />
          </div>
        )}
        {searchedBook.pages ? (
          <p className="text-base tracking-wide text-purple-100">
            {searchedBook.pages} pages
          </p>
        ) : (
          <div className="w-full py-4">
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
              className="block mb-8 p-2.5 bg-orange-100 border border-orange-200 text-gray-900 text-sm tracking-wide rounded-lg w-full placeholder:text-purple-500 focus:ring-purple-300 focus:border-purple-300 md:text-lg"
              placeholder="1001"
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => console.log("clicked edit book")}
          className="flex flex-col items-center justify-center py-10"
        >
          <img
            src={Check}
            alt="check"
            title="Update"
            className="w-12 hover:border hover:border-purple-300 hover:border-4 hover:rounded-full"
          />
        </button>
      </article>
    </form>
  );
};

export default EditBook;
