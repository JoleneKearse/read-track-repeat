// import { useState } from "react";
import { Book, NavLink } from "../types";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import AddForm from "../components/AddForm";
import ConfirmBook from "../components/ConfirmBook";
import NotFound from "../components/NotFound";

interface AddBookPageProps {
  navLinks: NavLink[];
  searchedBook: Book | null;
  books: Book[];
  handleAddBook: (newBook: Book) => void;
  handleCancelBook: () => void;
  handleConfirmBook: () => void;
  handleSearch: (book: Book) => void;
  bookNotFound: boolean;
  setBookNotFound: (bookNotFound: boolean) => void;
  handleManuallyAddBook: () => void;
  addBook: boolean;
}

const AddBookPage: React.FC<AddBookPageProps> = ({
  navLinks,
  handleCancelBook,
  handleConfirmBook,
  handleSearch,
  searchedBook,
  bookNotFound,
  setBookNotFound,
  handleManuallyAddBook,
  addBook,
}) => {
  // const [bookNotFound, setBookNotFound] = useState(false);

  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <NavBar navLinks={navLinks} />
      <main>
        <AddForm
          onSearch={handleSearch}
          bookNotFound={bookNotFound}
          setBookNotFound={setBookNotFound}
        />
        {searchedBook && (
          <ConfirmBook
            searchedBook={searchedBook}
            handleCancelBook={handleCancelBook}
            handleConfirmBook={handleConfirmBook}
            handleSearch={handleSearch}
          />
        )}
        {bookNotFound && (
          <NotFound
            handleManuallyAddBook={handleManuallyAddBook}
            addBook={addBook}
          />
        )}
      </main>
    </section>
  );
};

export default AddBookPage;
