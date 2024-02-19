import React from "react";

interface BooksReadProps {
  books: Book[];
}

const BooksRead: React.FC<BooksReadProps> = ({ books }) => {
  return (
    <main>
      {books.map((book) => (
        <section>
          <img
            src={book.coverImageUrl}
            alt={book.title}
          />
          <h3>
            {book.title}
          </h3>
          <p>
            {book.author}
          </p>
          <p>
            {book.published}
          </p>
          <p>
            {book.pages}
          </p>
        </section>
      ))}
    </main>
  )
}

export default BooksRead