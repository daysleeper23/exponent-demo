import { User } from '@/types/user';
import { Metadata } from './common';
import { CircleUser } from 'lucide-react';

export const localUsers: User[] = [
  {
    id: '156de810-1339-469d-9611-8443cdda88d1',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'owner@fs19java.com',
    name: 'Owner',
    avatarUrl: 'https://avatars.githubusercontent.com/u/61376821',
    onlineStatus: 'Online',
  },
  {
    id: '4a7d763b-9ec7-46a0-9861-9c0dfb8e7129',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'member1@fs19java.com',
    name: 'Member 1',
    avatarUrl: 'https://avatars.githubusercontent.com/u/70791879',
    onlineStatus: 'Online',
  },
  {
    id: '4b4b4b4b-4b4b-4b4b-4b4b-4b4b4b4b4b4b',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'member4@fs19java.com',
    name: 'Member 4',
    avatarUrl: 'https://avatars.githubusercontent.com/u/40638719',
    onlineStatus: 'Online',
  },
  {
    id: '745b3885-cb08-4076-b97e-626c56e10e0f',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'member2@fs19java.com',
    name: 'Member 2',
    avatarUrl: 'https://avatars.githubusercontent.com/u/22161778',
    onlineStatus: 'Online',
  },
  {
    id: '7f28dd30-549a-41af-bd42-1239651fe4f5',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'workspace_manager2@fs19java.com',
    name: 'Workspace Manager 2',
    avatarUrl: 'https://avatars.githubusercontent.com/u/70257910',
    onlineStatus: 'Online',
  },
  {
    id: 'acd9c8ef-87f3-4eae-bd92-238b01b746b6',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'company_manager@fs19java.com',
    name: 'Company Manager',
    avatarUrl: 'https://avatars.githubusercontent.com/u/68827456',
    onlineStatus: 'Online',
  },
  {
    id: 'f3b3b3b3-3b3b-3b3b-3b3b-3b3b3b3b3b3b',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'member3@fs19java.com',
    name: 'Member 3',
    avatarUrl: 'https://avatars.githubusercontent.com/u/85111973',
    onlineStatus: 'Online',
  },
  {
    id: 'f980e928-2ba4-47c5-abaa-cc675be24671',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'workspace_manager1@fs19java.com',
    name: 'Workspace Manager 1',
    avatarUrl: 'https://avatars.githubusercontent.com/u/19297866',
    onlineStatus: 'Online',
  },
  {
    id: 'f9a589e3-791b-43e4-9081-8251f9931214',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'guest@fs19java.com',
    name: 'Guest',
    avatarUrl: 'https://avatars.githubusercontent.com/u/5392705',
    onlineStatus: 'Online',
  },
];

export const localUsersMap: Metadata[] = localUsers.map((user) => {
  return {
    label: user.name,
    icon: CircleUser,
    value: user.id,
  };
});
