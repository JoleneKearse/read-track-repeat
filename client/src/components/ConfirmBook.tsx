import React from "react";
import Book from "../App"

// interface Book {
//   title: string;
//   author: string;
//   published: string;
//   pages: number;
//   coverImageUrl?: string;
// }

interface ConfirmBookProps {
  books: Book[];
}

const ConfirmBook: React.FC<ConfirmBookProps> = ({ books }) => {
  return (
    <main>
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
