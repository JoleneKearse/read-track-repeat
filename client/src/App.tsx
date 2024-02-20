import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SupabaseProvider } from "./context/SupabaseContext";
import { Book } from "./types"
import AddBookPage from "./pages/AddBookPage";

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
  };

  return (
    <SupabaseProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<AddBookPage books={books} handleAddBook={handleAddBook} />}
          />
        </Routes>
      </Router>
    </SupabaseProvider>
  );
}

export default App;
