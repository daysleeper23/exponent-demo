import { render, screen } from '@testing-library/react';
import TaskProperty from './task-property';
import '@testing-library/jest-dom';
import { priorityMap, statusMap } from '@/api/api-common';

describe('Rendering statuses', () => {
  test('renders TaskProperty with correct label and icon for Backlog', () => {
    const { container } = render(<TaskProperty value={0} items={statusMap} />);
    const labelElement = screen.getByText(/Backlog/i);
    expect(labelElement).toBeInTheDocument();
    const iconElement = container.querySelector(
      'svg.lucide.lucide-circle-help'
    );
    expect(iconElement).toBeInTheDocument();
  });

  test('renders TaskProperty with correct label and icon for Todo', () => {
    const { container } = render(<TaskProperty value={1} items={statusMap} />);
    const labelElement = screen.getByText(/Todo/i);
    expect(labelElement).toBeInTheDocument();
    const iconElement = container.querySelector('svg.lucide.lucide-circle');
    expect(iconElement).toBeInTheDocument();
  });

  test('renders TaskProperty with correct label and icon for In Progress', () => {
    const { container } = render(<TaskProperty value={2} items={statusMap} />);
    const labelElement = screen.getByText(/In Progress/i);
    expect(labelElement).toBeInTheDocument();
    const iconElement = container.querySelector('svg.lucide.lucide-timer');
    expect(iconElement).toBeInTheDocument();
  });

  test('renders TaskProperty with correct label and icon for Done', () => {
    const { container } = render(<TaskProperty value={3} items={statusMap} />);
    const labelElement = screen.getByText(/Done/i);
    expect(labelElement).toBeInTheDocument();
    const iconElement = container.querySelector(
      'svg.lucide.lucide-circle-check-big'
    );
    expect(iconElement).toBeInTheDocument();
  });

  test('renders TaskProperty with correct label and icon for Canceled', () => {
    const { container } = render(<TaskProperty value={4} items={statusMap} />);
    const labelElement = screen.getByText(/Canceled/i);
    expect(labelElement).toBeInTheDocument();
    const iconElement = container.querySelector('svg.lucide.lucide-circle-off');
    expect(iconElement).toBeInTheDocument();
  });
});

describe('Rendering priorities', () => {
  test('renders TaskProperty with correct label and icon for No priority', () => {
    const { container } = render(
      <TaskProperty value={0} items={priorityMap} />
    );
    const labelElement = screen.getByText(/No priority/i);
    expect(labelElement).toBeInTheDocument();
    const iconElement = container.querySelector('svg.lucide.lucide-minus');
    expect(iconElement).toBeInTheDocument();
  });

  test('renders TaskProperty with correct label and icon for Low', () => {
    const { container } = render(
      <TaskProperty value={1} items={priorityMap} />
    );
    const labelElement = screen.getByText(/Low/i);
    expect(labelElement).toBeInTheDocument();
    const iconElement = container.querySelector('svg.lucide.lucide-arrow-down');
    expect(iconElement).toBeInTheDocument();
  });

  test('renders TaskProperty with correct label and icon for Medium', () => {
    const { container } = render(
      <TaskProperty value={2} items={priorityMap} />
    );
    const labelElement = screen.getByText(/Medium/i);
    expect(labelElement).toBeInTheDocument();
    const iconElement = container.querySelector(
      'svg.lucide.lucide-arrow-right'
    );
    expect(iconElement).toBeInTheDocument();
  });

  test('renders TaskProperty with correct label and icon for High', () => {
    const { container } = render(
      <TaskProperty value={3} items={priorityMap} />
    );
    const labelElement = screen.getByText(/High/i);
    expect(labelElement).toBeInTheDocument();
    const iconElement = container.querySelector('svg.lucide.lucide-arrow-up');
    expect(iconElement).toBeInTheDocument();
  });

  test('renders TaskProperty with correct label and icon for Urgent', () => {
    const { container } = render(
      <TaskProperty value={4} items={priorityMap} />
    );
    const labelElement = screen.getByText(/Urgent/i);
    expect(labelElement).toBeInTheDocument();
    const iconElement = container.querySelector(
      'svg.lucide.lucide-octagon-alert'
    );
    expect(iconElement).toBeInTheDocument();
  });
});
