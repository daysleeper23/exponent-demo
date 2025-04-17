import { useState, useCallback, SyntheticEvent } from 'react';

interface VirtualizationOptions {
  totalItems: number;
  itemHeight: number;
  containerHeight: number;
  overscanFactor?: number;
}

interface VirtualizationResult {
  startIndex: number;
  endIndex: number;
  scrollTop: number;
  visibleCount: number;
  onScroll: (event: SyntheticEvent) => void;
  getItemStyle: (index: number) => React.CSSProperties;
  containerStyle: React.CSSProperties;
}

export const useVirtualization = ({
  totalItems,
  itemHeight,
  containerHeight,
  overscanFactor = 2,
}: VirtualizationOptions): VirtualizationResult => {
  // Max number of items to render outside the visible area
  const overScan = Math.min(
    Math.floor(containerHeight / itemHeight / overscanFactor),
    5
  );

  const [scrollTop, setScrollTop] = useState(0);

  // Calculate the visible range
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overScan);
  const visibleCount = Math.ceil(containerHeight / itemHeight) + overScan * 2;
  const endIndex = Math.min(totalItems, startIndex + visibleCount);

  // Handle scroll events with debouncing for better performance
  const onScroll = useCallback(
    (event: SyntheticEvent) => {
      const currentScrollTop = event.currentTarget.scrollTop;

      if (currentScrollTop >= scrollTop) {
        // Scrolling down
        if (currentScrollTop >= scrollTop + (overScan - 1) * itemHeight) {
          setScrollTop(currentScrollTop);
        }
      } else {
        // Scrolling up
        if (currentScrollTop <= scrollTop - (overScan - 1) * itemHeight) {
          setScrollTop(currentScrollTop);
        }
      }
    },
    [scrollTop, overScan, itemHeight]
  );

  // Memoize the style creation function
  const getItemStyle = useCallback(
    (index: number): React.CSSProperties => ({
      position: 'absolute',
      top: index * itemHeight,
      height: itemHeight,
      width: '100%',
    }),
    [itemHeight]
  );

  // Style for the container that holds all items
  const containerStyle = {
    height: totalItems * itemHeight,
    position: 'relative' as const,
  };

  return {
    startIndex,
    endIndex,
    scrollTop,
    visibleCount,
    onScroll,
    getItemStyle,
    containerStyle,
  };
};
