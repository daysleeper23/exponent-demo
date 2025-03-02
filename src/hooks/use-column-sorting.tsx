import { useState, useMemo } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Task } from "@/types/task";

/**
 * a custom hook that manages column sorting state, sorted tasks arrays,
 * and helper functions for toggling sort and displaying icons.
 */
const useColumnSorting = (tasks: Task[]) => {
  // the current column being sorted
  const [sortBy, setSortBy] = useState(0);

  // 1 for ascending, -1 for descending
  const [sortAsc, setSortAsc] = useState(1);

  // pre-compute all sorted variations, keyed by "sort key", cached with useMemo
  const sortedVariants = useMemo(() => {
    return {
      sortByNumberAsc: [...tasks].sort((a, b) => a.number - b.number),
      sortByNumberDesc: [...tasks].sort((a, b) => b.number - a.number),
      sortByTitleAsc: [...tasks].sort((a, b) => a.title.localeCompare(b.title)),
      sortByTitleDesc: [...tasks].sort((a, b) => b.title.localeCompare(a.title)),
      sortByStatusAsc: [...tasks].sort((a, b) => a.status - b.status),
      sortByStatusDesc: [...tasks].sort((a, b) => b.status - a.status),
      sortByPriorityAsc: [...tasks].sort((a, b) => a.priority - b.priority),
      sortByPriorityDesc: [...tasks].sort((a, b) => b.priority - a.priority),
    };
  }, [tasks]);

  // map each sort key (column) to its ascending/descending arrays + label
  const sortOptions = [
    {
      asc: sortedVariants.sortByNumberAsc,
      desc: sortedVariants.sortByNumberDesc,
      label: "Task"
    },
    {
      asc: sortedVariants.sortByTitleAsc,
      desc: sortedVariants.sortByTitleDesc,
      label: "Title"
    },
    {
      asc: sortedVariants.sortByStatusAsc,
      desc: sortedVariants.sortByStatusDesc,
      label: "Status"
    },
    {
      asc: sortedVariants.sortByPriorityAsc,
      desc: sortedVariants.sortByPriorityDesc,
      label: "Priority"
    }
  ] as const;

  const sortedTasks = useMemo(() => {
    // if current column is X and we are ascending, pick the asc array; else pick desc
    if (sortAsc === 1) {
      return sortOptions[sortBy].asc;
    }
    return sortOptions[sortBy].desc;
  }, [sortBy, sortAsc, sortOptions]);

  /**
   * switch to a new column or toggle between ascending/descending if the same column is clicked again.
   */
  const handleSortClick = (option: number) => {
    console.log('updating sort')
    // changing columns, reset to ascending
    if (sortBy !== option) {
      setSortBy(option);
      setSortAsc(1);
    } else {
      // same column => toggle ascending/descending
      setSortAsc((prev) => -prev);
    }
  }

  /**
   * returns the correct icon to show in a button based on the current
   * sort key/direction vs. the button's column option.
   */
  const getSortIcon = (option: number) => {
    if (sortBy === option) {
      return sortAsc === 1 ? <ArrowUp /> : <ArrowDown />;
    }
    return <ChevronsUpDown />;
  }

  return {
    sortedTasks,
    sortBy,
    sortAsc,
    handleSortClick,
    getSortIcon,
    sortOptions
  };
}
export default useColumnSorting;