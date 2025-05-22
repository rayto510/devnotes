import { useState } from 'react';
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";

interface Note {
  title: string;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const handleSave = (note: Note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6" >
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">DevNotes 📝</h1>
        <p className="text-gray-600 mb-6">A developer note-taking app (MVP in progress)</p>
        <NoteForm onSave={handleSave} />
        <div className="mt-8">
          <NotesList notes={notes} />
        </div>
      </div>
    </main>
  );
}

export default App;
