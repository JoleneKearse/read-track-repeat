import React from "react";

interface ConfimBookProps {
  books: Book[];
}

const ConfimBook: React.FC<ConfimBookProps> = ({ books }) => {
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

export default ConfimBook;
