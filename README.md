# Exponent - Overview

Exponent is a modern task management application inspired by Linear.app, built to showcase advanced front-end engineering practices. With a focus on modular architecture, robust state management, and component-driven development, Exponent features a clean, customizable Kanban board interface for seamless task tracking and issue management.

As a proof-of-concept for scalable, high-quality web apps, Exponent demonstrates best practices in TypeScript, React, and modern tooling (ESLint, Prettier). 

Even though the current focus is task management, the architecture is flexible and extensible, enabling future integrations like project and sprint planning.

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

## Features

### Virtualized List View
The Virtualized List View feature enhances performance and user experience by utilizing 'windowing' technique - rendering only the visible portion of a large list of tasks (in the current viewport). 

Instead of rendering all items at once, which can be slow and resource-intensive, the virtualized list dynamically loads and unloads items as the user scrolls. This approach significantly reduces the DOM size and improves rendering speed, making the application more responsive and scalable.

Key benefits:

- Performance Optimization: minimizes memory usage and improves rendering performance.
- Smooth Scrolling: Ensures a smooth scrolling experience even with a large number of tasks.
- Scalability: Supports large datasets without compromising performance, making it suitable for extensive task management needs.

This feature is implemented using a combination of React hooks and CSS for positioning, ensuring a seamless and efficient user experience.

### Dark-mode

Implemented using the [Context API](https://react.dev/reference/react/createContext), allowing the user to seamlessly switch between Dark and Light mode. This feature enhances the user experience by providing a personalized interface and improving readability based on user preferences. The selected mode is stored in localStorage, ensuring that the user's preference persists across sessions for a consistent experience.

