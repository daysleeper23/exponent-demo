// Button.stories.jsx
import React from 'react';
import TaskListRow from '../components/task/list/TaskListRow';

export default {
  title: 'Components/TaskListRow',
  component: TaskListRow,
  // Setup default “props” or controls
  args: {
    task: {
      id: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
      number: 100,
      title: 'We need to calculate the multi-byte IB monitor!',
      description:
        'Try to back up the CSS monitor, maybe it will calculate the 1080p card!',
      status: 3,
      priority: 4,
      assignee: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
      team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    },
  },
  argTypes: {},
};

export const Default = (args) => (
  <TaskListRow {...args}>{args.label}</TaskListRow>
);
