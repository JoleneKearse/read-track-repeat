import { useState } from "react";
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
  date: string;
  setDate: (date: string) => void;
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
  const [date, setDate] = useState("");

  return (
    <section className="min-h-screen bg-bg-gradient snap-y">
      <div className="py-10">
        <Header />
        <NavBar navLinks={navLinks} />
      </div>
      <main>
        <AddForm
          onSearch={handleSearch}
          bookNotFound={bookNotFound}
          setBookNotFound={setBookNotFound}
          date={date}
          setDate={setDate}
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
            date={date}
          />
        )}
      </main>
    </section>
  );
};

export default AddBookPage;
