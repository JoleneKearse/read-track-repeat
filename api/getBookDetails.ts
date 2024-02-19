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
  cover: Cover;
}

interface Book {
  title: string;
  author: string;
  published: string;
  pages: number;
  coverImageUrl?: string;
}

async function fetchBook(isbn: string): Promise<Book> {
  const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`);
  const data = await response.json();
  // console.log(data);
  const bookDetails: ApiResponse = data[`ISBN:${isbn}`]; 
  // console.log("************************************");
  // console.log(bookDetails);
  
  const bookData: Book = {
    title: bookDetails?.title,
    author: bookDetails?.authors.map(a => a.name).join(", "),
    published: bookDetails?.publish_date,
    pages: bookDetails?.number_of_pages,
    coverImageUrl: bookDetails.cover?.medium || "Cover image not available",
  }
  console.log(bookData);
  return bookData;
}

fetchBook("9780553418026");

// {
//   title: 'The Martian',
//   author: 'Andy Weir',
//   published: '2014',
//   pages: 387,
//   coverImageUrl: 'https://covers.openlibrary.org/b/id/11446888-M.jpg'
// }