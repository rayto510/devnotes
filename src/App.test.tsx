// import { render, screen } from '@testing-library/react';
// import App from './App';
// import { test, expect } from 'vitest';

// test('renders the app title', () => {
//   render(<App />);
//   expect(screen.getByText(/DevNotes/i)).toBeInTheDocument();
// });

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

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
