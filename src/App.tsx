import { useState } from 'react';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

interface Note {
  title: string;
  content: string;
  id: string;
  tags: string[];
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags || [])));

  const handleSave = (note: Note) => {
    const newNote = {
      ...note,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleDelete = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const filteredNotes = selectedTag
    ? notes.filter((note) => note.tags?.includes(selectedTag))
    : notes;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">
          DevNotes 📝
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A developer note-taking app (MVP in progress)
        </p>
        <NoteForm onSave={handleSave} />
        <div className="my-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded px-3 py-1 ${selectedTag === null ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded px-3 py-1 ${selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Show currently selected tag filter */}
        {selectedTag && (
          <p className="mb-4 text-sm text-gray-600">
            Filtering by <strong>#{selectedTag}</strong>
          </p>
        )}

        <NotesList notes={filteredNotes} onDelete={handleDelete} />
      </main>
    </div>
  );
}

export default App;
