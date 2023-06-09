# Project summary

What’s a newbie portfolio without a todo list app?

## Database data persistence

I’ve included code to persist data in the database, but to prevent abuse to the app, I commented the code out and instead included code to delete all data and seed default tasks upon refresh.

# Learning points

I haven't used Vite and Firebase before, so this project served as a good introduction to both technologies while reinforcing my React knowledge.

## Vite .env variables

To access API keys in React, we usually use `process.env.REACT_APP_API_KEY`, but Vite’s syntax is slightly different: `import.meta.env.VITE_REACT_APP_API_KEY`. Additionally, only variables prefixed with `VITE_` are exposed to the Vite-processed code.

## useEffect runs twice on mount in development in <React.StrictMode />

React 18 introduced the behaviour of running the `useEffect` hook twice in development mode to check if the dependencies listed in the dependency array are consistent between renders. This allows React to give developers warnings for issues such as:

1. Accidentally re-executing the effect on every render due to missing dependencies or incorrect dependency lists.
2. Causing infinite loops by changing a dependency within the effect itself without providing proper dependencies.
3. Detecting changes in dependencies that should be constant, such as defining functions or objects inline within the component.

Although the solution is as simple as commenting out `<React.StrictMode />` at the entry point (`main.jsx` in my case), it’s not recommended.

## Good, free APIs that fits the specs exactly are hard to find

Before embarking on a project, it’s always good to consider what APIs are required and if they suit the project’s needs before starting.

# What I improved

- Added outstanding tasks number that responds to whether the task’s checkbox is checked (previously it only counts the number of tasks regardless of completion and only responds to deletion).
- Added responsive number of outstanding tasks message at the bottom, which responds to whether the user has already interacted with the app and if all the tasks are deleted.
- Added the ability to edit task.
- Added a random quote generator at the bottom.

# Future improvements

It's good enough as a functioning to-do app, but if I were to improve on it, I'll

- Fix the order of the seeded tasks.
- Add drag-and-drop task reordering functionality.
- Add a "delete all" button.

=======================================

# Getting started

## Development server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
