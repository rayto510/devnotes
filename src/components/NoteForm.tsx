import { useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

interface NoteFormProps {
  onSave: (note: Note) => void;
}

export default function NoteForm({ onSave }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const tagsArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (!title || !content) return;
    onSave({ id: crypto.randomUUID(), title, content, tags: tagsArray });
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
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
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
