# Exponent - Overview

Exponent is a modern task management application inspired by Linear.app, built to showcase advanced front-end engineering practices. With a focus on modular architecture, robust state management, and component-driven development, Exponent features a clean, customizable Kanban board interface for seamless task tracking and issue management.

As a proof-of-concept for scalable, high-quality web apps, Exponent demonstrates best practices in TypeScript, React, and modern tooling (ESLint, Prettier). 

Even though the current focus is task management, the architecture is flexible and extensible, enabling future integrations like project and sprint planning.

## Table of Contents
- [Project Setup](#project-setup)
- [Project Structure & Routing](#project-structure--routing)
- [Documentation](#documentation)
- [Testing](#testing)
- [Features](#features)
  - [Virtualized List View](#virtualized-list-view)
  - [Hooks Usage](#hooks-usage)
  - [Dark-mode](#dark-mode)
- [API Integration](#api-integration)

## Project Setup

- Build tool & language: React with Typescript using [Vite](https://vitejs.dev/)
- Linting: ESLint, Prettier.
- UI components library: [shadcn](https://ui.shadcn.com/)
- Type safety: [zod](https://zod.dev/)

## Project Structure & Routing
- Routing: react-router
- Code splitting: lazy load pages on demand

## Documentation
[Storybook](https://storybook.js.org/) is the tool for documentation and showcase individual UI components in isolation. It makes browsing various states and variations of components easier, without needing to run the entire application.

To run Storybook
```
yarn storybook
```

Visit http://localhost:6006/ to see the documentation of React components.

## Testing

### Unit Testing

This project utilizes [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to ensure the reliability and correctness of React components.

The unit tests focus on:
- Component Rendering: verify that core components render correctly with various props and states.
- User Interactions: Simulating user interactions and ensuring the components respond as expected.
- Edge Cases: Handling edge cases to validate the components' ability to operate normally under unusual or extreme condition. 

To run the unit tests, run:

```
yarn test
```

## Key Features

### Virtualized List View
The Virtualized List View feature enhances performance and user experience by utilizing 'windowing' technique - rendering only the visible portion of a large list of tasks (in the current viewport). 

Instead of rendering all items at once, which can be slow and resource-intensive, the virtualized list dynamically loads and unloads items as the user scrolls. This approach significantly reduces the DOM size and improves rendering speed, making the application more responsive and scalable.

Key benefits:

- **Performance Optimization**: minimizes memory usage and improves rendering performance.
- **Smooth Scrolling**: Ensures a smooth scrolling experience even with a large number of tasks.
- **Scalability**: Supports large datasets without compromising performance, making it suitable for extensive task management needs.

This feature is implemented using a combination of React hooks and CSS for positioning, ensuring a seamless and efficient user experience.

### Hooks Usage
This project showcases how to encapsulate complex or repetitive logic into custom React Hooks. 

Reusable logic:
- **tasks sorting**
- **data fetching**
- **theming**

By extracting them into dedicated hooks, components remain simpler, more testable, and easier to maintain. 
This pattern is widely recommended for clear separation of concerns and improved code reusability.

### Dark-mode

Implemented using the [Context API](https://react.dev/reference/react/createContext), allowing the user to seamlessly switch between Dark and Light mode. This feature enhances the user experience by providing a personalized interface and improving readability based on user preferences. The selected mode is stored in localStorage, ensuring that the user's preference persists across sessions for a consistent experience.

## API Integration
This project uses [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) combined with [Axios](https://axios-http.com/docs/intro) for efficient and declarative API integration. React Query handles asynchronous data fetching, caching, and background updates, while Axios simplifies making HTTP requests. Together, they help reduce boilerplate code and improve the overall responsiveness and reliability of the application.

### Key Benefits
- **Automated Caching & Re-Fetching**: React Query caches responses and automatically re-fetches data when needed, ensuring the UI stays up-to-date with minimal effort.
- **Declarative API Calls**: Use familiar hooks (e.g., useQuery, useMutation) to manage data fetching, error handling, and loading states directly within React components.
- **Clean Separation of Concerns**: By abstracting API calls into hooks, UI components remain focused on presentation and logic.

### Example Usage
```
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchTasks = () =>
  axios.get('/api/tasks').then((res) => res.data);

export function useTasks() {
  return useQuery('tasks', fetchTasks, {
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 1, // Retry once on failure
  });
}
```