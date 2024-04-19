export interface Book {
  id?: number;
  title: string;
  author: string | undefined;
  published?: string | undefined;
  pages?: number | undefined;
  cover_img_url?: string;
  date_finished?: string | null;
}

export interface NavLink {
  name: string;
  path: string;
  icon: string;
  alt: string;
}