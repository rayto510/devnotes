import { render, screen, fireEvent } from '@testing-library/react';
import NotesList from './NotesList';
import { test, expect, vi } from 'vitest';

test('renders a list of notes with title and content', () => {
    const notes = [
        { title: 'Note 1', content: 'Content 1' },
        { title: 'Note 2', content: 'Content 2' },
    ];

    render(<NotesList notes={notes} />);

    expect(screen.getByText(/note 1/i)).toBeInTheDocument();
    expect(screen.getByText(/content 1/i)).toBeInTheDocument();
    expect(screen.getByText(/note 2/i)).toBeInTheDocument();
    expect(screen.getByText(/content 2/i)).toBeInTheDocument();
});