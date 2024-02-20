import React from "react";
import { Book } from "../types"

interface ConfirmBookProps {
  books: Book[];
}

const ConfirmBook: React.FC<ConfirmBookProps> = ({ books }) => {
  return (
    <main className="w-5/6 max-w-sm mx-auto">
      {books.map((book) => (
        <section>
          <img src={book.coverImageUrl} alt={book.title} />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.published}</p>
          <p>{book.pages}</p>
        </section>
      ))}
    </main>
  );
};

export default ConfirmBook;
