import { supabase } from "./supabase";
import { BookmarkType } from "@/types/bookmark";

// fetch bookmarks
export async function getBookmarks(userId: string) {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as BookmarkType[];
}

// create bookmarks
export async function createBookmark(
  title: string,
  url: string,
  userId: string,
) {
  const { data, error } = await supabase
    .from("bookmarks")
    .insert({
      title,
      url,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data as BookmarkType;
}

//delete bookmarks
export async function removeBookmark(id: string) {
  const { error } = await supabase.from("bookmarks").delete().eq("id", id);
  if (error) throw error;
}
