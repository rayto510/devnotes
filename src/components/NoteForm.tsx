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
        onSave({ title, content });
        setTitle('');
        setContent('');
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input onChange={e => setTitle(e.target.value)} placeholder="title" type="text" id="title" name="title" required />
    
            <label htmlFor="content">Content:</label>
            <textarea onChange={e => setContent(e.target.value)} placeholder="content" id="content" name="content" required></textarea>
    
            <button type="submit">Save Note</button>
        </form>
    );
}