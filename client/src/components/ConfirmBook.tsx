import React from "react";
import { Book } from "../types";
import Check from "/check.svg";
import Cross from "/cross.svg";

interface ConfirmBookProps {
  // books: Book[];
  searchedBook: Book;
  handleCancelBook: () => void;
  handleConfirmBook: () => void;
  handleSearch: (book: Book) => void;
  // bookNotFound: boolean;
}

const ConfirmBook: React.FC<ConfirmBookProps> = ({
  searchedBook,
  handleCancelBook,
  handleConfirmBook,
  // bookNotFound,
  // handleSearch,
}) => {
  return (
    <section className="w-5/6 max-w-sm py-32 mx-auto snap-center md:max-w-md">
      {searchedBook && (
        <article className="flex flex-col items-center justify-center p-6 bg-purple-700 border border-orange-200 rounded-lg">
          <img
            src={searchedBook.coverImageUrl}
            alt={searchedBook.title}
            className="w-3/4 pt-8 pb-10"
          />
          <h3 className="text-2xl font-bold tracking-wide text-orange-200">
            {searchedBook.title}
          </h3>
          <p className="text-xl tracking-wide text-orange-200">
            {searchedBook.author}
          </p>
          <p className="text-base tracking-wide text-purple-100">
            Published: {searchedBook.published}
          </p>
          <p className="pb-10 text-base tracking-wide text-purple-100">
            {searchedBook.pages} pages
          </p>
          <div className="flex ml-[5rem] pb-8 md:ml-[6rem]">
            <button type="button" onClick={handleCancelBook}>
              <img
                src={Cross}
                alt="cross"
                title="Not my book"
                className="w-1/3 hover:border hover:border-purple-300 hover:border-4 hover:rounded-full"
              />
            </button>
            <button type="button" onClick={handleConfirmBook}>
              <img
                src={Check}
                alt="check"
                title="Add to collection"
                className="w-1/3 hover:border hover:border-purple-300 hover:border-4 hover:rounded-full"
              />
            </button>
          </div>
        </article>
      )} 
    </section>
  );
};

export default ConfirmBook;
