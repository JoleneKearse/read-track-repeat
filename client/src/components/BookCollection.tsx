import React from "react";
import { Book } from "../types";
import Cover from "/cover.svg"

interface BookCollectionProps {
  books: Book[];
}

const BookCollection: React.FC<BookCollectionProps> = ({ books }) => {
  console.log(books);
  return (
    <section className="min-h-screen bg-bg-gradient snap-y">
      {books.map((book) => (
        <article className="flex flex-col items-center justify-center p-6 bg-purple-700 border border-orange-200 rounded-lg">
          <img
            src={book.coverImageUrl ? book.coverImageUrl : Cover}
            alt={book.title}
            className="w-3/4 pt-8 pb-10"
          />
          <h3 className="text-2xl font-bold tracking-wide text-orange-200">
            {book.title}
          </h3>
          <p className="text-xl tracking-wide text-orange-200">{book.author}</p>
          <p className="text-base tracking-wide text-purple-100">
            Published: {book.published}
          </p>
          <p className="pb-10 text-base tracking-wide text-purple-100">
            {book.pages} pages
          </p>
        </article>
      ))}
    </section>
  );
};

export default BookCollection;
