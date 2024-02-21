import { useState } from "react";
import Header from "../components/Header";
import AddForm from "../components/AddForm";
import ConfirmBook from "../components/ConfirmBook";
import { Book } from "../types";

interface AddBookPageProps {
  books: Book[];
  handleAddBook: (newBook: Book) => void;
  handleCancelBook: () => void;
  // handleConfirmBook: (searchedBook: Book) => void;
}

const AddBookPage: React.FC<AddBookPageProps> = () => {
  const [searchedBook, setSearchedBook] = useState<Book | null>(null);
  const handleSearch = async (book: Book) => {
    // console.log(book);
    setSearchedBook(book);
  };
  // const handleConfirmBook = async () => {
  //   if (searchedBook) {
  //     // TODO: add book to db
  //     // await addBookToDb(searchedBook);
  //     console.log(`Book to confirm: ${searchedBook}`);
  //     setSearchedBook(null);
  //   }
  // };
  const handleCancelBook = () => {
    // event.preventDefault();
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
      <AddForm onSearch={handleSearch} />
      {/* display ConfirmBook, once search is complete */}
      {searchedBook && (
        <ConfirmBook
          searchedBook={searchedBook}
          handleCancelBook={handleCancelBook}
        />
      )}
    </section>
  );
};

export default AddBookPage;
