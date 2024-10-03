import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from './TaskManager';
import axios from 'axios';
import { toast } from 'react-toastify';

jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('TaskManager', () => {
  const tasksMock = [
    { id: 1, title: 'Task 1', description: 'Description 1', category: 'Work', assignedTo: 'John', completed: false },
    { id: 2, title: 'Task 2', description: 'Description 2', category: 'Personal', assignedTo: 'Jane', completed: true },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: tasksMock });
  });

  it('renders the TaskManager component correctly', async () => {
    render(<TaskManager />);
    
    expect(screen.getByText(/Task Manager/i)).toBeInTheDocument();
    
    expect(await screen.findByText('Task 1')).toBeInTheDocument();
    expect(await screen.findByText('Task 2')).toBeInTheDocument();
  });

  it('filters tasks based on search term', async () => {
    render(<TaskManager />);

    fireEvent.change(screen.getByPlaceholderText(/Search tasks/i), { target: { value: 'Task 1' } });
    
    expect(await screen.findByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).toBeNull();
  });
});
