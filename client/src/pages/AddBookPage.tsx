import { useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import AddForm from "../components/AddForm";
import ConfirmBook from "../components/ConfirmBook";
import { Book, NavLink } from "../types";

interface AddBookPageProps {
  navLinks: NavLink[];
  books: Book[];
  handleAddBook: (newBook: Book) => void;
  handleCancelBook: () => void;
  handleConfirmBook: () => void;
}

const AddBookPage: React.FC<AddBookPageProps> = ({ navLinks }) => {
  const [searchedBook, setSearchedBook] = useState<Book | null>(null);

  const handleSearch = async (book: Book) => {
    // console.log(book);
    setSearchedBook(book);
  };

  const handleConfirmBook = () => {
    if (searchedBook) {
      // TODO: add book to db
      // await addBookToDb(searchedBook);
      console.log("Book to confirm:", searchedBook);
      setSearchedBook(null);
    }
  };

  const handleCancelBook = () => {
    // discard selection
    if (searchedBook) {
      console.log("discard selection");
      setTimeout(() => {
        setSearchedBook(null);
      }, 500);
      // setSearchedBook(null);
    }
  };

  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />
      <main>
        <AddForm onSearch={handleSearch} />
        {/* display ConfirmBook, once search is complete */}
        {searchedBook && (
          <ConfirmBook
            searchedBook={searchedBook}
            handleCancelBook={handleCancelBook}
            handleConfirmBook={handleConfirmBook}
          />
        )}
      </main>
    </section>
  );
};

export default AddBookPage;
