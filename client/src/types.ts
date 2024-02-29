export interface Book {
  title: string;
  author: string;
  published?: string;
  pages?: number;
  coverImageUrl?: string;
  dateFinished?: string;
}

export interface NavLink {
  name: string;
  path: string;
  icon: string;
  alt: string;
}