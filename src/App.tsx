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

  const handleSave = (note: Note) => {
    const newNote = {
      ...note,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleDelete = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

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
        <NotesList notes={notes} onDelete={handleDelete} />
      </main>
    </div>
  );
}

export default App;
