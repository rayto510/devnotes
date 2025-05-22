import { render, screen } from '@testing-library/react';
import NoteForm from './NoteForm';
import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

test('renders note form with title, content, and save button', () => {
    render(<NoteForm onSave={() => {}} />);
    const titleInput = screen.getByPlaceholderText(/title/i);
    const contentInput = screen.getByPlaceholderText(/content/i);
    const submitButton = screen.getByRole('button', { name: /save/i });
    
    expect(titleInput).toBeInTheDocument();
    expect(contentInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});

test('allows user to type in title and content fields', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(<NoteForm onSave={handleSave} />);

    const titleInput = screen.getByPlaceholderText(/title/i);
    const contentInput = screen.getByPlaceholderText(/content/i);
    const saveButton = screen.getByRole('button', { name: /save/i });
    
    // Simulate user typing in the title and content fields
    await user.type(titleInput, 'Test Title');
    await user.type(contentInput, 'Test Content');
    await user.click(saveButton);

    // Check if the title and content are set correctly
    expect(handleSave).toHaveBeenCalledWith({
        title: 'Test Title',
        content: 'Test Content',
    });
});