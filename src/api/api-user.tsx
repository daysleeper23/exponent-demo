import { User } from '@/types/user';
import { Metadata } from './api-common';
import { CircleUser } from 'lucide-react';

export const localUsers: User[] = [
  {
    id: '1d92af90-4c60-4f75-b8f3-89d19f60d809',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'owner@fs19java.com',
    name: 'Owner',
    avatarUrl: 'https://avatars.githubusercontent.com/u/61376821',
    onlineStatus: 'Online',
  },
  {
    id: '26be36d0-b70c-470d-a805-8cd0df39fcf0',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'member1@fs19java.com',
    name: 'Member 1',
    avatarUrl: 'https://avatars.githubusercontent.com/u/70791879',
    onlineStatus: 'Online',
  },
  {
    id: '45f987b8-aa3c-4cfe-9baf-e0507937116d',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'member4@fs19java.com',
    name: 'Member 4',
    avatarUrl: 'https://avatars.githubusercontent.com/u/40638719',
    onlineStatus: 'Online',
  },
  {
    id: '7cc01afe-e9d4-4727-85de-396bde166d82',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'member2@fs19java.com',
    name: 'Member 2',
    avatarUrl: 'https://avatars.githubusercontent.com/u/22161778',
    onlineStatus: 'Online',
  },
  {
    id: '82198bde-ae3c-43dd-9bd2-bda9381a39ce',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'workspace_manager2@fs19java.com',
    name: 'Workspace Manager 2',
    avatarUrl: 'https://avatars.githubusercontent.com/u/70257910',
    onlineStatus: 'Online',
  },
  {
    id: '88f2e9da-0e6e-402c-9c88-e3d091fca909',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'company_manager@fs19java.com',
    name: 'Company Manager',
    avatarUrl: 'https://avatars.githubusercontent.com/u/68827456',
    onlineStatus: 'Online',
  },
  {
    id: '8f10bece-468d-4066-991c-2046d4438a81',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'member3@fs19java.com',
    name: 'Member 3',
    avatarUrl: 'https://avatars.githubusercontent.com/u/85111973',
    onlineStatus: 'Online',
  },
  {
    id: '949111a9-731c-475c-84eb-e9b7dafb1087',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'workspace_manager1@fs19java.com',
    name: 'Workspace Manager 1',
    avatarUrl: 'https://avatars.githubusercontent.com/u/19297866',
    onlineStatus: 'Online',
  },
  {
    id: '9f4f972f-65b8-4869-a740-68635a677994',
    team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    email: 'guest@fs19java.com',
    name: 'Guest',
    avatarUrl: 'https://avatars.githubusercontent.com/u/5392705',
    onlineStatus: 'Online',
  },
];

export const localUsersMap: Record<string, Metadata> = localUsers.reduce(
  (acc, user) => {
    acc[user.id] = {
      label: user.name,
      icon: <CircleUser />,
      value: user.id,
    };
    return acc;
  },
  {} as Record<string, Metadata>
);
