"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { createBookmark, getBookmarks, removeBookmark } from "@/lib/bookmark";
import { supabase } from "@/lib/supabase";
import type { BookmarkType } from "@/types/bookmark";

type UseBookmarksResult = {
  bookmarks: BookmarkType[];
  addBookmark: (title: string, url: string) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
};

export function useBookmarks(session: Session | null): UseBookmarksResult {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const userId = session?.user.id;

  const fetchBookmarks = useCallback(async () => {
    if (!userId) return;
    const data = await getBookmarks(userId);
    setBookmarks(data);
  }, [userId]);

  const addBookmark = useCallback(
    async (title: string, url: string) => {
      if (!userId) return;

      const data = await createBookmark(title, url, userId);
      setBookmarks((prev) => [data, ...prev]);
    },
    [userId],
  );

  const deleteBookmark = useCallback(async (id: string) => {
    await removeBookmark(id);
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  }, []);

  useEffect(() => {
    if (!userId) return;

    const timeoutId = window.setTimeout(() => {
      void fetchBookmarks();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [userId, fetchBookmarks]);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`bookmarks-changes-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        () => fetchBookmarks(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchBookmarks]);

  return { bookmarks: userId ? bookmarks : [], addBookmark, deleteBookmark };
}
