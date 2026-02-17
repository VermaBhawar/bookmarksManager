"use client";

import { useState } from "react";
import { signInWithGoogle, signOut } from "@/lib/googleAuth";
import { useAuthSession } from "@/hooks/useAuthSession";
import { useBookmarks } from "@/hooks/useBookmarks";
import { BookmarkForm } from "@/components/BookmarkForm";
import { BookmarkList } from "@/components/BookmarkList";

function Home() {
  const { session, loading } = useAuthSession();
  const { bookmarks, addBookmark: createBookmark, deleteBookmark } =
    useBookmarks(session);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    if (!title || !url || !session) return;

    await createBookmark(title, url);
    setTitle("");
    setUrl("");
  };

  if (loading) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4">
        <p className="rounded-md border bg-white px-4 py-2 text-sm text-gray-700">
          Loading bookmarks...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-8">
      <header className="mb-4 rounded-lg border bg-white p-5">
        <h1 className="text-2xl font-bold">Smart Bookmark App</h1>
        <p className="mt-2 text-sm text-gray-600">
          Save links you want to revisit and keep them organized in one place.
        </p>
      </header>

      {!session ? (
        <section className="rounded-lg border bg-white p-5 text-center">
          <p className="mb-4 text-sm text-gray-600">
            Sign in to create and manage your bookmarks.
          </p>
          <button
            onClick={signInWithGoogle}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Continue with Google
          </button>
        </section>
      ) : (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-700">
              Signed in as{" "}
              <span className="font-semibold text-gray-900">{session.user.email}</span>
            </p>
            <button
              onClick={signOut}
              className="rounded-md border px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>

          <BookmarkForm
            title={title}
            url={url}
            onTitleChange={setTitle}
            onUrlChange={setUrl}
            onSubmit={addBookmark}
          />

          <BookmarkList bookmarks={bookmarks} onDelete={deleteBookmark} />
        </section>
      )}
    </main>
  );
}

export default Home;
