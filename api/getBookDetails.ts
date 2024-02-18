interface Book {
  title: string;
  author: string;
  coverImageUrl: string;
}

async function fetchBook(isbn: string): Promise<Book> {
  const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
  const data: Book = await response.json();
  console.log(data.title);
  return data;
}
