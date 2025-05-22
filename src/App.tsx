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
    <main style={{ padding: '1rem' }}>
      <h1>DevNotes 📝</h1>
      <p>A developer note-taking app (MVP in progress)</p>
      <NoteForm onSave={handleSave} />
      <NotesList notes={notes} />
    </main>
  );
}

export default App;
