'use client';

import { useState } from 'react';
import { Task } from '@/types';
import { deleteTask, updateTask } from '@/actions/tasksActions';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleToggleDone() {
    updateTask(task.id, { done: !task.done }); // Direct call to server action
  }

  function handleDeleteTask() {
    deleteTask(task.id); // Direct call to server action
  }

  return (
    <li className="flex items-center justify-between border-b p-2">
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleToggleDone}
        className="mr-2"
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 border-none focus:outline-none p-2"
        />
      ) : (
        <span className={`flex-1 ${task.done ? 'line-through' : ''}`}>{task.text}</span>
      )}

      <button
        onClick={() => setIsEditing(true)}
        className="bg-blue-500 text-white p-2 ml-2"
      >
        Edit
      </button>

      <button
        onClick={handleDeleteTask}
        className="bg-red-500 text-white p-2 ml-2"
      >
        Delete
      </button>
    </li>
  );
}
