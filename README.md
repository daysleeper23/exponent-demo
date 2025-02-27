# Exponent - Overview

Exponent is a modern task management application inspired by Linear.app, built to showcase advanced front-end engineering practices. With a focus on modular architecture, robust state management, and component-driven development, Exponent features a clean, customizable Kanban board interface for seamless task tracking and issue management.

Designed as a proof-of-concept for scalable, high-quality web apps, Exponent demonstrates best practices in TypeScript, React, and modern tooling (ESLint, Prettier). Although centered on task management, the architecture is flexible and extensible, laying the groundwork for future integrations like project and sprint planning.

## Project Setup

- Build tool & language: React with Typescript using [Vite](https://vitejs.dev/)
- Linting: ESLint, Prettier.
- UI components library: [shadcn](https://ui.shadcn.com/)

## Project Structure & Routing
- Routing: react-router
- Code splitting: lazy load pages on demand

## Documentation
Use [Storybook](https://storybook.js.org/) to document and showcase individual UI components in isolation. Storybook makes it easy to browse various states and variations of components without needing to run the entire application.

URL: http://localhost:6006/

To run Storybook
```
yarn storybook
```

## Features

### Dark-mode

Implemented using the [Context API](https://react.dev/reference/react/createContext), allowing the user to seamlessly switch between Dark and Light mode. This feature enhances the user experience by providing a personalized interface and improving readability based on user preferences. The selected mode is stored in localStorage, ensuring that the user's preference persists across sessions for a consistent experience.
