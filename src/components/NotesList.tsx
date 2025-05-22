interface Note {
  id: string;
  title: string;
  content: string;
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
          className="flex flex-col gap-2 rounded bg-white p-4 shadow sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {note.title}
            </h2>
            <p className="text-gray-600">{note.content}</p>
          </div>
          <button
            aria-label={`Delete note ${note.id}`}
            onClick={() => onDelete(note.id)}
            className="self-start text-sm text-red-600 hover:text-red-800 sm:self-auto"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500 italic">No notes available.</p>
  );
}
