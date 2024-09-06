/* src/TaskList.tsx */

import { Task } from './types';

export default function TaskList({ tasks, onChangeTask, onDeleteTask }: { tasks: Task[], onChangeTask: (task: Task) => void, onDeleteTask: (taskId: number) => void }) {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onChangeTask({ ...task, done: !task.done })}
              className="mr-2 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className={task.done ? 'line-through text-gray-500' : ''}>
              {task.text}
            </span>
          </div>
          <button
            className="ml-4 text-red-600 hover:text-red-800"
            onClick={() => onDeleteTask(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
