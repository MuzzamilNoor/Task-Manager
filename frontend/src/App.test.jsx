import { render, screen } from '@testing-library/react';
import { PriorityBadge } from './TaskManager';

test('renders High priority label', () => {
  render(<PriorityBadge priority="high" />);
  expect(screen.getByText('High')).toBeInTheDocument();
});