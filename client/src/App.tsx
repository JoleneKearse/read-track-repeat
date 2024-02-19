import { useState } from "react";
import Header from "./components/Header";
import AddForm from "./components/AddForm";
import ConfirmBook from "./components/ConfirmBook";

function App() {
  interface Book {
    title: string;
    author: string;
    published: string;
    pages: number;
    coverImageUrl: string;
  }

  const [books, setBooks] = useState<Book[]>([]);
  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
  };
  return (
    <div className="min-h-screen bg-bg-gradient">
      <Header />
      <AddForm onAddBook={handleAddBook} />
      <ConfirmBook books={books} />
    </div>
  );
}

export default App;
