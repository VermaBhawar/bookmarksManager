type BookmarkFormProps = {
  title: string;
  url: string;
  onTitleChange: (value: string) => void;
  onUrlChange: (value: string) => void;
  onSubmit: () => void;
};

export function BookmarkForm({
  title,
  url,
  onTitleChange,
  onUrlChange,
  onSubmit,
}: BookmarkFormProps) {
  const isValidUrl = (() => {
    if (!url.trim()) return true;
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  })();

  const canSubmit = Boolean(title.trim() && url.trim() && isValidUrl);

  return (
    <div className="rounded-lg border bg-white p-4">
      <h2 className="mb-3 text-lg font-semibold">Add Bookmark</h2>

      <input
        type="text"
        placeholder="Bookmark title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="mb-3 w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500"
      />
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        aria-invalid={!isValidUrl}
        className={`mb-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500 ${
          !isValidUrl ? "border-red-500" : ""
        }`}
      />
      {!isValidUrl && (
        <p className="mb-3 text-xs text-red-600">Enter a valid URL (for example: https://example.com).</p>
      )}
      {isValidUrl && <div className="mb-3" />}
      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        Add Bookmark
      </button>
    </div>
  );
}
