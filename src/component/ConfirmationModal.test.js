import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from './ConfirmationModal';

describe('ConfirmationModal', () => {
  const mockOnConfirm = jest.fn();
  const mockOnClose = jest.fn();

  it('renders the ConfirmationModal correctly', () => {
    render(<ConfirmationModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} taskTitle="Task 1" />);
    
    expect(screen.getByText(/Are you sure you want to delete/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
  });

  it('handles confirm action', () => {
    render(<ConfirmationModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} taskTitle="Task 1" />);
    
    fireEvent.click(screen.getByText(/Confirm/i));
    
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('closes modal when cancel is clicked', () => {
    render(<ConfirmationModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} taskTitle="Task 1" />);

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
