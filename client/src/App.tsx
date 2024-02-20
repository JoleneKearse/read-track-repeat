import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Book } from "./types"
import AddBookPage from "./pages/AddBookPage";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
  };
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<AddBookPage books={books} handleAddBook={handleAddBook} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
