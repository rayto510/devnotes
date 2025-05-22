import { render, screen } from '@testing-library/react';
import App from './App';
import { test, expect } from 'vitest';

test('renders the app title', () => {
  render(<App />);
  expect(screen.getByText(/DevNotes/i)).toBeInTheDocument();
});
