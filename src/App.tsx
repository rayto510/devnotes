import { useState } from 'react';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

interface Note {
  title: string;
  content: string;
  id: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const handleSave = (note: Note) => {
    const newNote = {
      ...note,
    };
    debugger;
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleDelete = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8 font-sans text-gray-800">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">DevNotes 📝</h1>
        <p className="mb-6 text-gray-600">
          A developer note-taking app (MVP in progress)
        </p>
        <NoteForm onSave={handleSave} />
        <div className="mt-8">
          <NotesList notes={notes} onDelete={handleDelete} />
        </div>
      </div>
    </main>
  );
}

export default App;
