import React from "react";
import { Book } from "../types";
import Cover from "/cover.svg";

interface BookCollectionProps {
  books: Book[];
  handleDataFetch: () => void;
}

const BookCollection: React.FC<BookCollectionProps> = ({ books }) => {
  return (
    <section className="min-h-screen snap-y md:grid md:grid-cols-2 lg:grid-cols-4">
      {books.map((book) => (
        <article
          key={book.id}
          className="flex flex-col items-center justify-center w-3/5 p-4 mx-auto my-10 text-center bg-purple-700 border border-orange-200 rounded-lg"
        >
          <img
            src={book.cover_img_url ? book.cover_img_url : Cover}
            alt={book.title}
            className="w-2/5 pt-8 pb-10"
          />
          <h3 className="text-2xl font-bold tracking-wide text-orange-200">
            {book.title}
          </h3>
          <p className="text-xl tracking-wide text-orange-200">{book.author}</p>
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
  );
};

export default BookCollection;
