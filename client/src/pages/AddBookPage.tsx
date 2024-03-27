import { useState, useRef, useEffect } from "react";

import { Book, NavLink } from "../types";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import AddForm from "../components/AddForm";
import ConfirmBook from "../components/ConfirmBook";
import NotFound from "../components/NotFound";
import EditBook from "../components/EditBook";

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
  handleEditBook: (book: Book) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
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
  handleEditBook,
  isEditing,
  setIsEditing,
}) => {
  const [date, setDate] = useState("");
  const searchResultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchResultsRef.current && searchedBook) {
      searchResultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchedBook]);

  useEffect(() => {
    console.log(`Editing state changed in AddBookPage: ${isEditing}`);
  }, [isEditing]);

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
        <div ref={searchResultsRef}>
          {searchedBook && (
            <EditBook
              searchedBook={searchedBook}
              handleEditBook={handleEditBook}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          )}
          
        </div>
        {/* {isEditing && (
          <EditBook
            searchedBook={searchedBook}
            handleEditBook={handleEditBook}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        )} */}
        {/* {bookNotFound && (
          <>
            <NotFound
              handleManuallyAddBook={handleManuallyAddBook}
              addBook={addBook}
              date={date}
            />
            <EditBook
              searchedBook={searchedBook}
              handleEditBook={handleEditBook}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </>
        )} */}


{/* {!isEditing ? (
            <ConfirmBook
              searchedBook={searchedBook}
              handleCancelBook={handleCancelBook}
              handleConfirmBook={handleConfirmBook}
              handleSearch={handleSearch}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handleEditBook={handleEditBook}
            />
          ) : (
            <>
            <NotFound
              handleManuallyAddBook={handleManuallyAddBook}
              addBook={addBook}
              date={date}
            />
            <EditBook
              searchedBook={searchedBook}
              handleEditBook={handleEditBook}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </>
          )} */}
      </main>
    </section>
  );
};

export default AddBookPage;
