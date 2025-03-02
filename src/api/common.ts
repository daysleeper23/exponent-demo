import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Circle,
  CircleCheckBig,
  CircleHelp,
  CircleOff,
  LucideIcon,
  Minus,
  OctagonAlert,
  Timer,
} from 'lucide-react';

export interface Metadata {
  label: string;
  icon: LucideIcon;
}

export interface TaskPropertyMap {
  [key: string]: Metadata;
}

export const statusMap: TaskPropertyMap = {
  '0': {
    label: 'Backlog',
    icon: CircleHelp,
  },
  '1': {
    label: 'Todo',
    icon: Circle,
  },
  '2': {
    label: 'In Progress',
    icon: Timer,
  },
  '3': {
    label: 'Done',
    icon: CircleCheckBig,
  },
  '4': {
    label: 'Canceled',
    icon: CircleOff,
  },
};

export const priorityMap: TaskPropertyMap = {
  '0': {
    label: 'No priority',
    icon: Minus,
  },
  '1': {
    label: 'Low',
    icon: ArrowDown,
  },
  '2': {
    label: 'Medium',
    icon: ArrowRight,
  },
  '3': {
    label: 'High',
    icon: ArrowUp,
  },
  '4': {
    label: 'Urgent',
    icon: OctagonAlert,
  },
};

export const sortingOptions: Metadata[] = [
  {
    label: 'Asc',
    icon: ArrowDown,
  },
  {
    label: 'Desc',
    icon: ArrowUp,
  },
];
