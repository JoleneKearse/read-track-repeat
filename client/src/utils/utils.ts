import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { Book } from "../types";

export const handleSearchResponse = (
  data: Book[] | null,
  error: PostgrestError | null
): Book[] => {
  if (error) {
    console.log("Error:", error);
    return [];
  } else {
    // @ts-expect-error: data could be undefined
    return data;
  }
};

export const searchBooksByTitle = async (
  supabase: SupabaseClient,
  title: string
): Promise<Book[]> => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("date_finished", { ascending: false });

  return handleSearchResponse(data, error);
};

export const searchBooksByAuthor = async (
  supabase: SupabaseClient,
  author: string
): Promise<Book[]> => {
  let query = supabase.from("books").select("*");
  const [firstName, ...rest] = author.split(" ");
  const lastName = rest.pop();

  const authorPattern = lastName
    ? `%${firstName}%${lastName ? `%${lastName}` : ""}%`
    : `%${firstName}%`;

  query = query
    .ilike("author", authorPattern)
    .order("date_finished", { ascending: false });

  const { data, error } = await query;

  return handleSearchResponse(data, error);
};