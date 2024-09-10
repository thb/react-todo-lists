import { useReducer } from "react";
import tasksReducer from "./reducers/tasksReducer";
import { Task } from "./types";
import { TaskContext } from "./TaskContext";

// TaskProvider component to provide the context to children
export function TaskProvider({ children }: { children: React.ReactNode }) {
  let initialTasks: Task[] = [
    { id: 1, text: 'Visit Kafka Museum', done: true },
    { id: 2, text: 'Watch a puppet show', done: false },
    { id: 3, text: 'Lennon Wall pic', done: false },
  ];

  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}