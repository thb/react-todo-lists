# With Redux

## About this version

Here we want to improve (and illustrate) wuth the use of 3 hooks:

1. useCallback

useCallback is used to memoize callback functions, which helps in avoiding unnecessary re-creations of functions during re-renders. It’s particularly useful when you are passing functions as props to child components, as it helps prevent unnecessary re-renders of those components.

Where to use useCallback in our app:

* In TaskItem.tsx, where we handle actions like updating a task, toggling done, or deleting a task.

2. useMemo

useMemo is used to memoize expensive calculations or derived data, ensuring that they are only re-computed when necessary (i.e., when the dependencies change).

Where to use useMemo in our app:

* In TaskList.tsx, to memoize the filtered task list. The task list can be large, and the filtering process can be a bit expensive. Memoizing the filtered tasks ensures that the filtering is only done when the task list or filter changes.

3. useEffect
useEffect is used for handling side effects such as data fetching, subscriptions, or any operations that need to happen when a component mounts, updates, or unmounts.

Where to use useEffect in your app:
Side-effects like fetching tasks from a backend API or saving tasks to local storage could use useEffect.
If you're integrating an API, for example, you could fetch tasks when the app initializes.
