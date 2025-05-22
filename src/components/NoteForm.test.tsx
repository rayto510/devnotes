import { render, screen } from '@testing-library/react';
import NoteForm from './NoteForm';
import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

test('renders note form with title, content, and save button', () => {
  render(<NoteForm onSave={() => {}} />);
  const titleInput = screen.getByPlaceholderText(/title/i);
  const contentInput = screen.getByPlaceholderText(/content/i);
  const submitButton = screen.getByRole('button', { name: /add note/i });

  expect(titleInput).toBeInTheDocument();
  expect(contentInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('focuses title input after submitting the form via clicking the submit button', async () => {
  const user = userEvent.setup();
  render(<NoteForm onSave={() => {}} />);

  const titleInput = screen.getByPlaceholderText(/title/i);
  const contentInput = screen.getByPlaceholderText(/content/i);
  const submitButton = screen.getByRole('button', { name: /add note/i });

  // Fill out and submit the form
  await user.type(titleInput, 'My note');
  await user.type(contentInput, 'Some content');
  await user.click(submitButton);

  // Check that title input is focused again
  expect(titleInput).toHaveFocus();
});

test('focuses title input after pressing Enter', async () => {
  const user = userEvent.setup();
  render(<NoteForm onSave={() => {}} />);

  const titleInput = screen.getByPlaceholderText('Title');
  const contentInput = screen.getByPlaceholderText('Content');

  await user.type(titleInput, 'My note');
  await user.type(contentInput, 'Some content');

  // Focus content input
  contentInput.focus();

  // Press Enter key on content input
  await user.keyboard('{Enter}');

  expect(titleInput).toHaveFocus();
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
  const tagsInput = screen.getByPlaceholderText(/tags \(comma separated\)/i);
  const saveButton = screen.getByRole('button', { name: /add note/i });

  // Simulate user typing in the title and content fields
  await user.type(titleInput, 'Test Title');
  await user.type(contentInput, 'Test Content');
  await user.type(tagsInput, 'Test Tag, Test Tag 2');
  await user.click(saveButton);

  // Check if the title and content are set correctly
  expect(handleSave).toHaveBeenCalledWith({
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Title',
    content: 'Test Content',
    tags: ['Test Tag', 'Test Tag 2'],
  });
  expect(titleInput).not.toHaveTextContent('Test Title');
  expect(contentInput).not.toHaveTextContent('Test Content');
  expect(tagsInput).not.toHaveTextContent('Test Tag, Test Tag 2');
});

test('prevent user from submitting empty title', async () => {
  const user = userEvent.setup();
  const handleSave = vi.fn();

  vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(
    '123e4567-e89b-12d3-a456-426614174000'
  );

  render(<NoteForm onSave={handleSave} />);

  const titleInput = screen.getByPlaceholderText(/title/i);
  const contentInput = screen.getByPlaceholderText(/content/i);
  const tagsInput = screen.getByPlaceholderText(/tags \(comma separated\)/i);
  const saveButton = screen.getByRole('button', { name: /add note/i });

  // Simulate user typing in the title and content fields
  await user.type(titleInput, ' ');
  await user.type(contentInput, 'Test Content');
  await user.type(tagsInput, 'Test Tag, Test Tag 2');
  await user.click(saveButton);

  expect(handleSave).not.toHaveBeenCalled();
});

test('prevent user from submitting empty content', async () => {
  const user = userEvent.setup();
  const handleSave = vi.fn();

  vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(
    '123e4567-e89b-12d3-a456-426614174000'
  );

  render(<NoteForm onSave={handleSave} />);

  const titleInput = screen.getByPlaceholderText(/title/i);
  const contentInput = screen.getByPlaceholderText(/content/i);
  const tagsInput = screen.getByPlaceholderText(/tags \(comma separated\)/i);
  const saveButton = screen.getByRole('button', { name: /add note/i });

  // Simulate user typing in the title and content fields
  await user.type(titleInput, 'Test title');
  await user.type(contentInput, '  ');
  await user.type(tagsInput, 'Test Tag, Test Tag 2');
  await user.click(saveButton);

  expect(handleSave).not.toHaveBeenCalled();
});

test('allows user to submit note form without tags', async () => {
  const user = userEvent.setup();
  const handleSave = vi.fn();

  vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(
    '123e4567-e89b-12d3-a456-426614174000'
  );

  render(<NoteForm onSave={handleSave} />);

  const titleInput = screen.getByPlaceholderText(/title/i);
  const contentInput = screen.getByPlaceholderText(/content/i);
  const saveButton = screen.getByRole('button', { name: /add note/i });

  // Simulate user typing in the title and content fields
  await user.type(titleInput, 'Test Title');
  await user.type(contentInput, 'Test Content');
  await user.click(saveButton);

  // Check if the title and content are set correctly
  expect(handleSave).toHaveBeenCalledWith({
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Title',
    content: 'Test Content',
    tags: [],
  });
  expect(titleInput).not.toHaveTextContent('Test Title');
  expect(contentInput).not.toHaveTextContent('Test Content');
});

test('does not add a note if title or content is empty', () => {
  const user = userEvent.setup();
  const onSave = vi.fn();

  render(<NoteForm onSave={onSave} />);

  // Simulate clicking 'Save' with empty title and content
  const saveButton = screen.getByRole('button', { name: /add note/i });

  user.click(saveButton);

  expect(onSave).not.toHaveBeenCalled();
});
