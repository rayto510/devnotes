import { useState, useRef } from 'react';

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

  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const tagsArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (!title.trim() || !content.trim()) return;
    onSave({ id: crypto.randomUUID(), title, content, tags: tagsArray });
    setTitle('');
    setContent('');
    setTags('');
    titleRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent default newline in textarea if needed
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800"
    >
      <input
        ref={titleRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Title"
        required
        className="mb-3 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        onKeyDown={handleKeyDown}
        required
        className="mb-3 h-24 w-full resize-none rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tags (comma separated)"
        className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
      >
        Add Note
      </button>
    </form>
  );
}
