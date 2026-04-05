import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Disaster Management System header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Disaster Management System/i);
  expect(headerElement).toBeInTheDocument();
});
