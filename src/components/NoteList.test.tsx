import { render, screen, fireEvent } from '@testing-library/react';
import NotesList from './NotesList';
import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

test('renders a list of notes with title and content', () => {
  const notes = [
    { id: '1', title: 'Note 1', content: 'Content 1' },
    { id: '2', title: 'Note 2', content: 'Content 2' },
  ];

  render(<NotesList notes={notes} onDelete={() => {}} />);

  expect(screen.getByText(/note 1/i)).toBeInTheDocument();
  expect(screen.getByText(/content 1/i)).toBeInTheDocument();
  expect(screen.getByText(/note 2/i)).toBeInTheDocument();
  expect(screen.getByText(/content 2/i)).toBeInTheDocument();
});

test('renders empty state when no notes are provided', () => {
  render(<NotesList notes={[]} onDelete={() => {}} />);

  expect(screen.getByText(/no notes available/i)).toBeInTheDocument();
});

test('deletes a note when delete button is clicked', async () => {
  const user = userEvent.setup();
  const notes = [
    { id: '1', title: 'Note 1', content: 'Content 1' },
    { id: '2', title: 'Note 2', content: 'Content 2' },
  ];
  const onDelete = vi.fn();

  render(<NotesList notes={notes} onDelete={onDelete} />);

  const deleteButton = screen.getByLabelText('Delete note 1');

  await user.click(deleteButton);
  expect(onDelete).toHaveBeenCalledWith('1');
});
