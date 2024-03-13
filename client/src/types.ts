export interface Book {
  id?: number;
  title: string;
  author: string;
  published?: string | null;
  pages?: number | null;
  cover_img_url?: string | null;
  date_finished?: string | null;
}

export interface NavLink {
  name: string;
  path: string;
  icon: string;
  alt: string;
}