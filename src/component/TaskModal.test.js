import { render, screen, fireEvent } from '@testing-library/react';
import TaskModal from './TaskModal';

describe('TaskModal', () => {
  const mockOnClose = jest.fn();
  const mockOnTaskUpdated = jest.fn();

  it('renders the Create Task modal correctly', () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} onTaskUpdated={mockOnTaskUpdated} task={null} />);

    expect(screen.getByText(/Create Task/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
  });

  it('handles form submission for a new task', () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} onTaskUpdated={mockOnTaskUpdated} task={null} />);

    fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'New Description' } });
    fireEvent.click(screen.getByText(/Create Task/i));

    expect(mockOnTaskUpdated).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('closes modal when cancel is clicked', () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} onTaskUpdated={mockOnTaskUpdated} task={null} />);

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
