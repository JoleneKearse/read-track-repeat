import Header from "../components/Header";
import AddForm from "../components/AddForm";
import ConfirmBook from "../components/ConfirmBook";
import { Book } from "../types";


interface AddBookPageProps {
  books: Book[];
  handleAddBook: (newBook: Book) => void;
}

const AddBookPage: React.FC<AddBookPageProps> = ({ books, handleAddBook }) => {
  return (
    <section className="min-h-screen bg-bg-gradient">
      <Header />
      <AddForm onAddBook={handleAddBook} />
      <ConfirmBook books={books} />
    </section>
  );
};

export default AddBookPage;
