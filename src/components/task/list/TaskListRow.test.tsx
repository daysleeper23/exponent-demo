import { render, screen } from '@testing-library/react';
import TaskListRow from './TaskListRow';
import { Task } from '@/types/task';
import '@testing-library/jest-dom';

const mockTask: Task = {
  id: '1',
  number: 123,
  title: 'Test Task',
  description: 'Test Task',
  status: 1,
  priority: 2,
  assignee: '1',
  team: '1'
};

test('renders TaskListRow without crashing', () => {
  render(<TaskListRow task={mockTask} />);
  const taskNumberElement = screen.getByText(/EXP-123/i);
  expect(taskNumberElement).toBeInTheDocument();
});

test('renders task title correctly', () => {
  render(<TaskListRow task={mockTask} />);
  const taskTitleElement = screen.getByText(/Test Task/i);
  expect(taskTitleElement).toBeInTheDocument();
});

test('renders task status correctly', () => {
  render(<TaskListRow task={mockTask} />);
  const taskStatusElement = screen.getByText(/Todo/i);
  expect(taskStatusElement).toBeInTheDocument();
});

test('renders task priority correctly', () => {
  render(<TaskListRow task={mockTask} />);
  const taskPriorityElement = screen.getByText(/Medium/i);
  expect(taskPriorityElement).toBeInTheDocument();
});

test('applies correct styles', () => {
  render(<TaskListRow task={mockTask} />);
  const taskRowElement = screen.getByTestId('1');
  expect(taskRowElement).toHaveClass('w-full px-4 py-2 flex gap-4 items-center justify-between border-b border-primary-200 dark:border-primary-700 hover:bg-primary-foreground pointer-events-auto');
});