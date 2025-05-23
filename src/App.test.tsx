import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { test, expect, vi } from 'vitest';

const sampleNotes = [
  { title: 'Note 1', content: 'Content 1', tags: ['work'] },
  { title: 'Note 2', content: 'Content 2', tags: ['personal'] },
  { title: 'Note 3', content: 'Content 3', tags: ['work', 'urgent'] },
];

test('adds note with tags and displays them', async () => {
  render(<App />);

  await userEvent.type(screen.getByPlaceholderText(/title/i), 'My note');
  await userEvent.type(
    screen.getByPlaceholderText(/content/i),
    'This is content'
  );
  await userEvent.type(screen.getByPlaceholderText(/tags/i), 'tag1, tag2');

  await userEvent.click(screen.getByRole('button', { name: /add note/i }));

  expect(screen.getByText('My note')).toBeInTheDocument();
  expect(screen.getByText('This is content')).toBeInTheDocument();
  expect(screen.getByText('tag1')).toBeInTheDocument();
  expect(screen.getByText('tag2')).toBeInTheDocument();
});

test('deleting a note will not make it display', async () => {
  const user = userEvent.setup();
  render(<App />);
  vi.stubGlobal('crypto', {
    randomUUID: vi
      .fn()
      .mockImplementationOnce(() => 'uuid-1') // 1st call
      .mockImplementationOnce(() => 'my-special-uuid') // 2nd call
      .mockImplementationOnce(() => 'uuid-3'), // 3rd call
  });

  for (const note of sampleNotes) {
    await user.type(screen.getByPlaceholderText(/title/i), note.title);
    await user.type(screen.getByPlaceholderText(/content/i), note.content);
    if (note.tags) {
      await user.type(
        screen.getByPlaceholderText(/tags/i),
        note.tags.join(', ')
      );
    }
    await user.click(screen.getByRole('button', { name: /add note/i }));
  }

  await user.click(
    screen.getByRole('button', { name: /delete note my-special-uuid/i })
  );

  expect(screen.getByText(/note 1/i)).toBeInTheDocument();
  expect(screen.queryByText(/note 2/i)).not.toBeInTheDocument();
  expect(screen.getByText(/note 3/i)).toBeInTheDocument();
});

test('shows all notes when no tag is selected', async () => {
  const user = userEvent.setup();
  render(<App />);
  vi.stubGlobal('crypto', {
    randomUUID: vi
      .fn()
      .mockImplementationOnce(() => 'uuid-1') // 1st call
      .mockImplementationOnce(() => 'my-special-uuid') // 2nd call
      .mockImplementationOnce(() => 'uuid-3'), // 3rd call
  });

  for (const note of sampleNotes) {
    await user.type(screen.getByPlaceholderText(/title/i), note.title);
    await user.type(screen.getByPlaceholderText(/content/i), note.content);
    if (note.tags) {
      await user.type(
        screen.getByPlaceholderText(/tags/i),
        note.tags.join(', ')
      );
    }
    await user.click(screen.getByRole('button', { name: /add note/i }));
  }

  expect(screen.getByText(/#work/i)).toBeInTheDocument();
  expect(screen.getByText(/#personal/i)).toBeInTheDocument();
  expect(screen.getByText(/#urgent/i)).toBeInTheDocument();

  expect(screen.queryByText(/filtering by #all/i)).not.toBeInTheDocument();
});

test('filters notes by selected tag', async () => {
  const user = userEvent.setup();
  render(<App />);
  vi.stubGlobal('crypto', {
    randomUUID: vi
      .fn()
      .mockImplementationOnce(() => 'uuid-1') // 1st call
      .mockImplementationOnce(() => 'my-special-uuid') // 2nd call
      .mockImplementationOnce(() => 'uuid-3'), // 3rd call
  });

  for (const note of sampleNotes) {
    await user.type(screen.getByPlaceholderText(/title/i), note.title);
    await user.type(screen.getByPlaceholderText(/content/i), note.content);
    if (note.tags) {
      await user.type(
        screen.getByPlaceholderText(/tags/i),
        note.tags.join(', ')
      );
    }
    await user.click(screen.getByRole('button', { name: /add note/i }));
  }

  await user.click(screen.getByText('#work'));

  expect(screen.getAllByText('work').length).toBeGreaterThan(0);
  expect(screen.queryByText('personal')).not.toBeInTheDocument();
  expect(screen.getByText('urgent')).toBeInTheDocument();
  expect(
    screen.getByText(
      (content, element) =>
        element?.textContent?.toLowerCase() === 'filtering by #work'
    )
  ).toBeInTheDocument();
});
