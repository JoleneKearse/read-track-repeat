import { useState, useRef, useEffect } from "react";

import { Book, NavLink } from "../types";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import AddForm from "../components/AddForm";
// import ConfirmBook from "../components/ConfirmBook";
// import NotFound from "../components/NotFound";
import EditBook from "../components/EditBook";

interface AddBookPageProps {
  navLinks: NavLink[];
  searchedBook: Book | null;
  books: Book[];
  handleAddBook: (newBook: Book) => void;
  handleCancelBook: () => void;
  handleConfirmBook: (book: Book) => void;
  handleSearch: (book: Book | null) => void;
  bookNotFound: boolean;
  setBookNotFound: (bookNotFound: boolean) => void;
  editingBook: Book | null;
  setEditingBook: (editedBook: Book | null) => void;
  date: string;
  setDate: (date: string) => void;
  handleEditBook: (book: Book) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  onSubmit: (book: Book) => void;
  mode: "add" | "edit";
  handleModeChange: (newMode: "add" | "edit", book?: Book) => void;
}

const AddBookPage: React.FC<AddBookPageProps> = ({
  navLinks,
  handleCancelBook,
  handleConfirmBook,
  handleSearch,
  searchedBook,
  bookNotFound,
  setBookNotFound,
  editingBook,
  setEditingBook,
  handleEditBook,
  isEditing,
  setIsEditing,
  mode,
  handleModeChange,
  onSubmit,
}) => {
  const [date, setDate] = useState("");
  const searchResultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchResultsRef.current && searchedBook) {
      searchResultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchedBook]);

  useEffect(() => {
    console.log(`🦜🦜🦜Editing state changed in AddBookPage: ${isEditing} ${mode}`);
  }, [isEditing, mode]);

  return (
    <section className="min-h-screen bg-bg-gradient snap-y">
      <div className="py-10">
        <Header />
        <NavBar navLinks={navLinks} />
      </div>
      <main>
        <AddForm
          handleSearch={handleSearch}
          bookNotFound={bookNotFound}
          setBookNotFound={setBookNotFound}
          date={date}
          setDate={setDate}
          searchedBook={mode === "add" ? searchedBook : null}
          mode={mode}
          handleModeChange={handleModeChange}
          onSubmit={onSubmit}
          // TODO: REMOVE
          isEditing={isEditing}
        />
        <div ref={searchResultsRef}>
          {searchedBook && (
            <EditBook
              searchedBook={searchedBook}
              handleEditBook={handleEditBook}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              editingBook={editingBook}
              setEditingBook={setEditingBook}
              handleCancelBook={handleCancelBook}
              handleConfirmBook={handleConfirmBook}
              handleModeChange={handleModeChange}
              mode={mode}
            />
          )}
        </div>
      </main>
    </section>
  );
};

export default AddBookPage;
