import type { BookmarkType } from "@/types/bookmark";

type BookmarkListProps = {
  bookmarks: BookmarkType[];
  onDelete: (id: string) => void;
};

export function BookmarkList({ bookmarks, onDelete }: BookmarkListProps) {
  return (
    <div className="space-y-2">
      {bookmarks.length === 0 && (
        <p className="rounded-lg border bg-white p-4 text-center text-sm text-gray-600">
          No bookmarks yet. Add your first one above.
        </p>
      )}

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="flex items-start justify-between gap-3 rounded-lg border bg-white p-3"
        >
          <div className="min-w-0">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noreferrer"
              className="line-clamp-1 text-base font-medium text-gray-900 hover:text-blue-600"
            >
              {bookmark.title}
            </a>
            <p className="mt-1 line-clamp-1 text-xs text-gray-500">{bookmark.url}</p>
          </div>

          <button
            onClick={() => onDelete(bookmark.id)}
            className="shrink-0 rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
