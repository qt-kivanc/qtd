import { render, screen } from '@testing-library/react';
import App from './App';

test('renders quantech design library link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Quantech Design Library/i);
  expect(linkElement).toBeInTheDocument();
});
