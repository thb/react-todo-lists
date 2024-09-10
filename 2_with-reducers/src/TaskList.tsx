/* src/TaskList.tsx */

import { useState } from 'react';
import { Task } from './types';

export default function TaskList({ tasks, onChangeTask, onDeleteTask }: { tasks: Task[], onChangeTask: (task: Task) => void, onDeleteTask: (taskId: number) => void }) {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  // Function to handle saving the edited task
  function handleSave(task: Task) {
    onChangeTask({ ...task, text: editingText });
    setEditingTaskId(null);  // Exit edit mode after saving
  }

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
            {editingTaskId === task.id ? (
              // If in edit mode, show input to edit the task
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="mr-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              // If not in edit mode, show the task text
              <span className={task.done ? 'line-through text-gray-500' : ''}>
                {task.text}
              </span>
            )}
          </div>
          <div className="ml-4 flex space-x-2">
            {editingTaskId === task.id ? (
              // If in edit mode, show Save button
              <button
                className="text-green-600 hover:text-green-800"
                onClick={() => handleSave(task)}
              >
                Save
              </button>
            ) : (
              // If not in edit mode, show Edit button
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => {
                  setEditingTaskId(task.id);  // Enter edit mode
                  setEditingText(task.text);  // Pre-fill with current task text
                }}
              >
                Edit
              </button>
            )}

            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
