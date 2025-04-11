import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Circle,
  CircleCheckBig,
  CircleHelp,
  CircleOff,
  Minus,
  OctagonAlert,
  Timer,
} from 'lucide-react';

export interface Metadata {
  label: string;
  icon: React.ReactNode;
  value: string | number;
}

export interface TaskPropertyMap {
  [key: string]: Metadata;
}

const ICON_SIZE = 18;

export const statusMap: TaskPropertyMap = {
  '0': {
    label: 'Backlog',
    icon: <CircleHelp size={ICON_SIZE} />,
    value: 0,
  },
  '1': {
    label: 'Todo',
    icon: <Circle size={ICON_SIZE} />,
    value: 1,
  },
  '2': {
    label: 'In Progress',
    icon: <Timer size={ICON_SIZE} />,
    value: 2,
  },
  '3': {
    label: 'Done',
    icon: <CircleCheckBig size={ICON_SIZE} />,
    value: 3,
  },
  '4': {
    label: 'Canceled',
    icon: <CircleOff size={ICON_SIZE} />,
    value: 4,
  },
};

export const priorityMap: TaskPropertyMap = {
  '0': {
    label: 'No priority',
    icon: <Minus size={ICON_SIZE} />,
    value: 0,
  },
  '1': {
    label: 'Low',
    icon: <ArrowDown size={ICON_SIZE} />,
    value: 1,
  },
  '2': {
    label: 'Medium',
    icon: <ArrowRight size={ICON_SIZE} />,
    value: 2,
  },
  '3': {
    label: 'High',
    icon: <ArrowUp size={ICON_SIZE} />,
    value: 3,
  },
  '4': {
    label: 'Urgent',
    icon: <OctagonAlert size={ICON_SIZE} />,
    value: 4,
  },
};

export const groupByOptions: TaskPropertyMap = {
  status: {
    label: 'Status',
    icon: <Circle size={ICON_SIZE} />,
    value: 'status',
  },
  priority: {
    label: 'Priority',
    icon: <ArrowUp size={ICON_SIZE} />,
    value: 'priority',
  },
};
