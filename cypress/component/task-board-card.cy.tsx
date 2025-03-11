import { QueryClientProvider } from '@tanstack/react-query';
import TaskBoardCard from '../../src/components/task/board/task-board-card';
import queryClient from '@/api/query-client';
import { mount } from 'cypress/react';

queryClient.setQueryData(['tasks'], {
  json: {
    id: '31aac393-427f-4606-bef1-e346e3f7eefe',
    number: 1,
    title: 'Add Real-Time Database Schema Design',
    description: '',
    status: 4,
    assignee: 'aba1a22b-6af0-4b32-9566-c2c4072eb75a',
    priority: 2,
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
  },
});

describe('<TaskBoardCard />', () => {
  it('renders', () => {
    mount(
      <QueryClientProvider client={queryClient}>
        <TaskBoardCard id={'31aac393-427f-4606-bef1-e346e3f7eefe'} />
      </QueryClientProvider>
    );
  });
});
