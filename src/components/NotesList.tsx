interface Note {
    title: string;
    content: string;
}

interface NotesListProps {
    notes: Note[];
};

export default function NotesList({ notes }: NotesListProps) {
    return (
        <div>
            {notes.map((note, index) => (
                <article key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
                    <h2 style={{ margin: '0 0 0.5rem' }}>{note.title}</h2>
                    <p style={{ margin: '0' }}>{note.content}</p>
                </article>
            ))}
            {notes.length === 0 && <p>No notes available.</p>}
        </div>
    );
}