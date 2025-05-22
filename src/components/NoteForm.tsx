import { useState } from 'react';

interface Note {
  title: string;
  content: string;
}

interface NoteFormProps {
  onSave: (note: Note) => void;
}

export default function NoteForm({ onSave }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !content) return;
    onSave({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 space-y-4 rounded bg-white p-4 shadow"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded border border-gray-300 p-2"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full resize-none rounded border border-gray-300 p-2"
      />
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Save Note
      </button>
    </form>
  );
}
