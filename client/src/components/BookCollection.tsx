import React from "react";
import { Book } from "../types";

interface BookCollectionProps {
  books: Book[];
}

const BookCollection: React.FC<BookCollectionProps> = ({ books }) => {
  return (
    <div>BookCollection</div>
  )
}

export default BookCollection