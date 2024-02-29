interface Author {
  name: string;
}

interface Cover {
  medium?: string;
}

interface ApiResponse {
  title: string;
  authors: Author[];
  publish_date: string;
  number_of_pages: number;
  cover?: Cover;
}

interface Book {
  title: string;
  author: string;
  published: string;
  pages: number;
  coverImageUrl?: string;
}

async function fetchBookByIsbn(isbn: string): Promise<Book> {
  try {
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`);
    const data = await response.json();
    // console.log(data);
    const bookDetails: ApiResponse | undefined = data[`ISBN:${isbn}`]; 
    // console.log("************************************");
    if (!bookDetails) {
      console.log("Book not found");
      return null as unknown as Book;
    }
    console.log(bookDetails);

    // handle books without image url
    let coverImageUrl: string | undefined = "Cover image not available";
    if (bookDetails.cover && bookDetails.cover.medium) {
      coverImageUrl = bookDetails.cover.medium;
    }
    
    const bookData: Book = {
      title: bookDetails?.title,
      author: bookDetails?.authors.map(a => a.name).join(", "),
      published: bookDetails?.publish_date,
      pages: bookDetails?.number_of_pages,
      coverImageUrl: coverImageUrl,
    }
    console.log(bookDetails);
    return bookData;
  } catch (error) {
    console.log(error);
    return null as unknown as Book;
  }
}

export default fetchBookByIsbn;