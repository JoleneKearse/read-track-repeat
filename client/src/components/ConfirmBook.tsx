import React from "react";
import { Book } from "../types";

interface ConfirmBookProps {
  books: Book[];
}

const ConfirmBook: React.FC<ConfirmBookProps> = ({ books }) => {
  return (
    <main className="w-5/6 max-w-sm py-20 mx-auto md:max-w-md">
      {books.map((book) => (
        <section className="flex flex-col items-center justify-center p-6 bg-purple-700 border border-orange-200 rounded-lg">
          <img
            src={book.coverImageUrl}
            alt={book.title}
            className="w-3/4 pt-8 pb-10"
          />
          <h3
            className="text-2xl font-bold tracking-wide text-orange-200"
          >
            {book.title}
          </h3>
          <p
            className="text-xl tracking-wide text-orange-200"
          >
            {book.author}
          </p>
          <p
            className="text-base tracking-wide text-purple-100"
          >
            Published in {book.published}
          </p>
          <p
            className="text-base tracking-wide text-purple-100"
          >
            {book.pages} pages
          </p>
        </section>
      ))}
    </main>
  );
};

export default ConfirmBook;
