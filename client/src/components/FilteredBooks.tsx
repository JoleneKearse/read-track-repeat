import React from "react";
import { Book } from "../types";
import Cover from "/cover.svg";

interface FilteredBooksProps {
  filteredBooks: Book[];
}

const FilteredBooks: React.FC<FilteredBooksProps> = ({ filteredBooks }) => {
  return (
    <>
      {filteredBooks.length !== 0 ? (
        <p className="text-2xl font-bold tracking-wide text-center text-purple-200 mt-28">
          {filteredBooks.length} book{filteredBooks.length === 1 ? "" : "s"}{" "}
          found
        </p>
      ) : (
        <p className="p-3 mb-10 text-3xl font-bold text-center text-purple-100 bg-orange-gradient">
          No results!
        </p>
      )}

      <section
        className={`justify-center min-h-screen ${
          filteredBooks.length <= 3
            ? "lg:flex lg:gap-10"
            : "md:grid md:grid-cols-2 lg:grid-cols-4 md:h-auto md:py-28"
        }`}
      >
        {filteredBooks.map((book) => (
          <article
            key={book.id}
            className={`flex flex-col items-center justify-center flex-none w-3/5 p-4 mx-auto my-10 text-center bg-overlay border border-orange-200 shadow-lg shadow-orange-200a rounded-lg ${
              filteredBooks.length <= 3 ? "lg:max-w-xs lg:max-h-[450px]" : ""
            }`}
          >
            <p className="py-8 text-2xl tracking-wide text-orange-300 text-balance">
              You finished this book on{" "}
              <span className="font-bold">{book.date_finished}</span>
            </p>
            <img
              src={book.cover_img_url ? book.cover_img_url : Cover}
              alt={book.title}
              className="w-2/5 pt-8 pb-10"
            />
            <h3 className="text-2xl font-bold tracking-wide text-orange-200 max-w-64 text-balance">
              {book.title}
            </h3>
            <p className="text-xl tracking-wide text-orange-200 text-balance">
              {book.author}
            </p>
            {book.published && (
              <p className="text-base tracking-wide text-purple-100">
                Published: {book.published}
              </p>
            )}
            {book.pages && (
              <p className="pb-10 text-base tracking-wide text-purple-100">
                {book.pages} pages
              </p>
            )}
          </article>
        ))}
      </section>
    </>
  );
};

export default FilteredBooks;
