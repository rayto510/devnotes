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

test('allows user to type in title and content fields and clears the form after clicking submit', async () => {
  const user = userEvent.setup();
  const handleSave = vi.fn();

  vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(
    '123e4567-e89b-12d3-a456-426614174000'
  );

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
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Title',
    content: 'Test Content',
  });
  expect(titleInput).not.toHaveTextContent('Test Title');
  expect(contentInput).not.toHaveTextContent('Test Content');
});

test('does not add a note if title or content is empty', () => {
  const user = userEvent.setup();
  const onSave = vi.fn();

  render(<NoteForm onSave={onSave} />);

  // Simulate clicking 'Save' with empty title and content
  const saveButton = screen.getByRole('button', { name: /save/i });

  user.click(saveButton);

  expect(onSave).not.toHaveBeenCalled();
});
