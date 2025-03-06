interface Author {
  name: string;
}

interface Cover {
  medium?: string;
  thumbnail?: string;
}

interface ApiResponse {
  title: string;
  authors?: Author[] | null;
  publish_date?: string;
  publishedDate?: string;
  number_of_pages?: number;
  pageCount?: number;
  pagination?: number;
  cover?: Cover;
  imageLinks?: Cover;
  thumbnail?: Cover;
}

interface Book {
  id?: number;
  title: string;
  author: string | null;
  published: string | undefined;
  pages: number | undefined;
  coverImageUrl?: string;
}

interface IndustryIdentifiers {
  type: string;
  identifier: string;
}

export async function fetchBookByIsbn(isbn: string): Promise<Book> {
  try {
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`);
    const data = await response.json();
    console.log(data);
    const bookDetails: ApiResponse | undefined = data[`ISBN:${isbn}`];
    if (!bookDetails) {
      console.log("Book not found");
      return null as unknown as Book;
    }
    
    const bookData: Book = {
      title: bookDetails?.title,
      author: bookDetails?.authors?.map(a => a.name).join(", ") || "",
      published: bookDetails?.publish_date,
      pages: bookDetails?.number_of_pages || bookDetails?.pagination,
      coverImageUrl: bookDetails?.cover?.medium,
    }
    console.log(`data returned from ISBN: `, bookData);
    return bookData;
  } catch (error) {
    console.log(error);
    return null as unknown as Book;
  }
}

export async function fetchBookByTitle(title: string): Promise<Book | null>{
  const formattedTitle = title.replace(/\s/g, "+");
  try {
    console.log(`https://www.googleapis.com/books/v1/volumes?q=intitle:${formattedTitle}`)
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${formattedTitle}`);
    const data = await response.json();
    console.log(data["items"][0]["volumeInfo"]);

    // grab ISBN while we're at it - if we can
    const industryIdentifiers: IndustryIdentifiers[] = data["items"][0]["volumeInfo"]["industryIdentifiers"];
    const isbn10Identifier = industryIdentifiers?.find(identifier => identifier.type === "ISBN_10");
    const isbn = isbn10Identifier ? isbn10Identifier?.identifier : 'No isbn 10 found';
    console.log(isbn);

    const bookDetails: ApiResponse | undefined = data["items"][0]["volumeInfo"];
    if (!bookDetails) {
      console.log("Book not found");
      return null as unknown as Book;
    }

    const bookData: Book = {
      title: bookDetails?.title,
      author: bookDetails?.authors?.join(", ") || null,
      published: bookDetails?.publishedDate,
      pages: bookDetails?.pageCount,
      coverImageUrl: bookDetails?.imageLinks?.thumbnail,
    }

    console.log(`data returned from title: `, bookData);

    // if any values missing, search by ISBN
    const returnedDataValues = Object.values(bookData);
    const isDataMissing = returnedDataValues.some((data) => !data);
    if (isDataMissing && isbn) {
      console.log("title not completed, searching by ISBN");

      // find missing values 
      const missingKeys = Object.keys(bookData).filter(key => !bookData[key as keyof Book]);
      console.log("Missing keys:", missingKeys);
      // search by ISBN
      const additionalData = await fetchBookByIsbn(isbn);
      if (additionalData) {
        missingKeys.forEach(key => {
          (bookData as any)[key] = (additionalData as any)[key];
        })
      }
      return bookData;      
    }

    return bookData;
  } catch (error) {
    console.log(error);
    return null as unknown as Book;
  }
}

export async function fetchBookByAuthor(author: string): Promise<Book | null>{
  const formattedAuthor = author.replace(/\s/g, "+");
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${formattedAuthor}`);
    const data = await response.json();
    console.log(data["items"][0]["volumeInfo"]);
    const bookDetails: ApiResponse | undefined = data["items"][0]["volumeInfo"];
    if (!bookDetails) {
      console.log("Book not found");
      return null as unknown as Book;
    }
    const bookData: Book = {
      title: bookDetails?.title,
      author: bookDetails?.authors?.join(", ") || null,
      published: bookDetails?.publishedDate,
      pages: bookDetails?.pageCount,
      coverImageUrl: bookDetails?.imageLinks?.thumbnail,
    }
    return bookData;
  } catch (error) {
    console.log(error);
    return null as unknown as Book;
  }
}

export async function fetchBookByTitleAndAuthor(info: string): Promise<Book | null>{
  let [title, author] = info.split("/");
  title = title.trim().replace(/\s/g, "+");
  author = author.trim().replace(/\s/g, "+");
  try {
    console.log(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}`)
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}`);
    const data = await response.json();
    console.log(data["items"][0]["volumeInfo"]);

    // grab ISBN while we're at it - if we can
    const industryIdentifiers: IndustryIdentifiers[] = data["items"][0]["volumeInfo"]["industryIdentifiers"];
    const isbn10Identifier = industryIdentifiers?.find(identifier => identifier.type === "ISBN_10");
    const isbn = isbn10Identifier ? isbn10Identifier?.identifier : 'No isbn 10 found';
    console.log(isbn);

    const bookDetails: ApiResponse | undefined = data["items"][0]["volumeInfo"];
    if (!bookDetails) {
      console.log("Book not found");
      return null as unknown as Book;
    }

    const bookData: Book = {
      title: bookDetails?.title,
      author: bookDetails?.authors?.join(", ") || null,
      published: bookDetails?.publishedDate,
      pages: bookDetails?.pageCount,
      coverImageUrl: bookDetails?.imageLinks?.thumbnail,
    }

    console.log(`data returned from title and author: `, bookData);

    // if any values missing, search by ISBN
    const returnedDataValues = Object.values(bookData);
    const isDataMissing = returnedDataValues.some((data) => !data);
    if (isDataMissing && isbn) {
      console.log("title not completed, searching by ISBN");

      // find missing values 
      const missingKeys = Object.keys(bookData).filter(key => !bookData[key as keyof Book]);
      console.log("Missing keys:", missingKeys);
      // search by ISBN
      const additionalData = await fetchBookByIsbn(isbn);
      if (additionalData) {
        missingKeys.forEach(key => {
          (bookData as any)[key] = (additionalData as any)[key];
        })
      }
      return bookData;      
    }

    return bookData;
  } catch (error) {
    console.log(error);
    return null as unknown as Book;
  }
}
