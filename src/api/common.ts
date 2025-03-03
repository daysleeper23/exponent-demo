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
  value: number;
}

export interface TaskPropertyMap {
  [key: string]: Metadata;
}

export const statusMap: TaskPropertyMap = {
  '0': {
    label: 'Backlog',
    icon: CircleHelp,
    value: 0,
  },
  '1': {
    label: 'Todo',
    icon: Circle,
    value: 1,
  },
  '2': {
    label: 'In Progress',
    icon: Timer,
    value: 2,
  },
  '3': {
    label: 'Done',
    icon: CircleCheckBig,
    value: 3,
  },
  '4': {
    label: 'Canceled',
    icon: CircleOff,
    value: 4,
  },
};

export const priorityMap: TaskPropertyMap = {
  '0': {
    label: 'No priority',
    icon: Minus,
    value: 0,
  },
  '1': {
    label: 'Low',
    icon: ArrowDown,
    value: 1,
  },
  '2': {
    label: 'Medium',
    icon: ArrowRight,
    value: 2,
  },
  '3': {
    label: 'High',
    icon: ArrowUp,
    value: 3,
  },
  '4': {
    label: 'Urgent',
    icon: OctagonAlert,
    value: 4,
  },
};