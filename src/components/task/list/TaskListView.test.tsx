import { render, screen, fireEvent } from '@testing-library/react';
import TaskListView from './TaskListView';
import { Task } from '@/types/task';
import '@testing-library/jest-dom';

const mockTasks: Task[] = [
  {
    id: '1',
    number: 1,
    title: 'Task 1',
    description: 'Description 1',
    status: 1,
    priority: 1,
    assignee: '1',
    team: '1',
  },
  {
    id: '2',
    number: 2,
    title: 'Task 2',
    description: 'Description 2',
    status: 2,
    priority: 2,
    assignee: '2',
    team: '2',
  },
  {
    id: '3',
    number: 3,
    title: 'Task 3',
    description: 'Description 3',
    status: 3,
    priority: 3,
    assignee: '3',
    team: '3',
  },
  {
    id: '4',
    number: 4,
    title: 'Task 4',
    description: 'Description 4',
    status: 4,
    priority: 4,
    assignee: '4',
    team: '4',
  },
  {
    id: '5',
    number: 5,
    title: 'Task 5',
    description: 'Description 5',
    status: 0,
    priority: 0,
    assignee: '5',
    team: '5',
  },
  {
    id: '6',
    number: 6,
    title: 'Task 6',
    description: 'Description 6',
    status: 0,
    priority: 0,
    assignee: '6',
    team: '6',
  },
  {
    id: '7',
    number: 7,
    title: 'Task 7',
    description: 'Description 7',
    status: 0,
    priority: 0,
    assignee: '7',
    team: '7',
  },
  {
    id: '8',
    number: 8,
    title: 'Task 8',
    description: 'Description 8',
    status: 0,
    priority: 0,
    assignee: '8',
    team: '8',
  },
  {
    id: '9',
    number: 9,
    title: 'Task 9',
    description: 'Description 9',
    status: 0,
    priority: 0,
    assignee: '9',
    team: '9',
  },
  {
    id: '10',
    number: 10,
    title: 'Task 10',
    description: 'Description 10',
    status: 0,
    priority: 0,
    assignee: '10',
    team: '10',
  },
  {
    id: '11',
    number: 11,
    title: 'Task 11',
    description: 'Description 11',
    status: 0,
    priority: 0,
    assignee: '11',
    team: '11',
  },
  {
    id: '12',
    number: 12,
    title: 'Task 12',
    description: 'Description 12',
    status: 0,
    priority: 0,
    assignee: '12',
    team: '12',
  },
  {
    id: '13',
    number: 13,
    title: 'Task 13',
    description: 'Description 13',
    status: 0,
    priority: 0,
    assignee: '13',
    team: '13',
  },
  {
    id: '14',
    number: 14,
    title: 'Task 14',
    description: 'Description 14',
    status: 0,
    priority: 0,
    assignee: '14',
    team: '14',
  },
  {
    id: '15',
    number: 15,
    title: 'Task 15',
    description: 'Description 15',
    status: 0,
    priority: 0,
    assignee: '15',
    team: '15',
  },
  // Add more tasks as needed for testing
];

// const rowHeight = 45;
const viewportHeight = 200;

test('renders TaskListView without crashing', () => {
  render(<TaskListView tasks={mockTasks} viewHeight={viewportHeight} />);
  const taskElement = screen.getByText(/Task 2/i);
  expect(taskElement).toBeInTheDocument();
});

test('renders the correct number of visible items', () => {
  render(<TaskListView tasks={mockTasks} viewHeight={viewportHeight} />);
  const taskElements = screen.getAllByText(/Task/i);
  expect(taskElements.length).toBeGreaterThan(5);
});

test('handles scrolling DOWN correctly if the list of item fits in the viewport', () => {
  const { container } = render(
    <TaskListView tasks={mockTasks} viewHeight={viewportHeight} />
  );
  const scrollContainer = container.querySelector('.overflow-y-auto');
  expect(scrollContainer).toBeInTheDocument();

  if (scrollContainer) {
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 100 } });
    const taskElement = screen.getByText(/Task 2/i);
    expect(taskElement).toBeInTheDocument();
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 0 } });
  }
});

test('handles scrolling DOWN correctly if the list of item does not fit in the viewport', () => {
  const { container } = render(
    <TaskListView tasks={mockTasks} viewHeight={100} />
  );
  const scrollContainer = container.querySelector('.overflow-y-auto');
  expect(scrollContainer).toBeInTheDocument();

  if (scrollContainer) {
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 200 } });
    expect(screen.queryByText(/Task 2/i)).not.toBeInTheDocument();
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 0 } });
  }
});

test('handles scrolling UP correctly if the list of item fits in the viewport', () => {
  const { container } = render(
    <TaskListView tasks={mockTasks} viewHeight={viewportHeight} />
  );
  const scrollContainer = container.querySelector('.overflow-y-auto');
  expect(scrollContainer).toBeInTheDocument();

  if (scrollContainer) {
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 200 } });
    expect(screen.queryByText(/Task 2/i)).not.toBeInTheDocument();
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 0 } });
    expect(screen.queryByText(/Task 2/i)).toBeInTheDocument();
  }
});

test('handles scrolling UP correctly if the list of item does not fit in the viewport', () => {
  const { container } = render(
    <TaskListView tasks={mockTasks} viewHeight={100} />
  );
  const scrollContainer = container.querySelector('.overflow-y-auto');
  expect(scrollContainer).toBeInTheDocument();

  if (scrollContainer) {
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 200 } });
    expect(screen.queryByText(/Task 2/i)).not.toBeInTheDocument();
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 0 } });
    expect(screen.queryByText(/Task 2/i)).toBeInTheDocument();
  }
});

test('renders TaskListRow components with correct styles', () => {
  render(<TaskListView tasks={mockTasks} viewHeight={viewportHeight} />);
  const taskElement = screen.getByText(/Task 3/i).closest('div');
  expect(taskElement).toHaveStyle({
    position: 'absolute',
    top: '90px',
    height: '45px',
    width: '100%',
  });
});
