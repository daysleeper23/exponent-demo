import { ArrowDown, ArrowRight, ArrowUp, Circle, CircleCheckBig, CircleHelp, CircleOff, LucideIcon, Minus, OctagonAlert, Timer } from "lucide-react";

export interface TaskPropertyMap {
  [key: string]: {
    label: string;
    icon: LucideIcon;
  };
}

export const statusMap: TaskPropertyMap = {
  '0': {
    label: "Backlog",
    icon: CircleHelp
  },
  '1': {
    label: "Todo",
    icon: Circle
  },
  '2': {
    label: "In Progress",
    icon: Timer
  },
  '3': {
    label: "Done",
    icon: CircleCheckBig
  },
  '4': {
    label: "Canceled",
    icon: CircleOff
  }
};

export const priorityMap: TaskPropertyMap = {
  '0': {
    label: "No priority",
    icon: Minus
  },
  '1': {
    label: "Low",
    icon: ArrowDown
  },
  '2': {
    label: "Medium",
    icon: ArrowRight
  },
  '3': {
    label: "High",
    icon: ArrowUp
  },
  '4': {
    label: "Urgent",
    icon: OctagonAlert
  }
};