interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

interface NotesListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NotesList({ notes, onDelete }: NotesListProps) {
  return notes.length > 0 ? (
    <ul className="space-y-4">
      {notes.map((note) => (
        <li
          key={note.id}
          className="flex flex-col rounded-lg bg-white p-4 shadow dark:bg-gray-800"
        >
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {note.title}
            </h2>
            <button
              aria-label={`Delete note ${note.id}`}
              onClick={() => onDelete(note.id)}
              className="cursor-pointer text-red-600 transition hover:text-red-800"
            >
              &#x2715;
            </button>
          </div>
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            {note.content}
          </p>
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-700 dark:text-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500 italic dark:text-gray-400">
      No notes available.
    </p>
  );
}
