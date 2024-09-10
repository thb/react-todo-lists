import React, { useState } from 'react';
import { Task } from './types';
import { useUpdateTaskMutation, useDeleteTaskMutation } from './slices/tasksApi'; // Import RTK Query hooks

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const [updateTask] = useUpdateTaskMutation(); // Hook for updating tasks
  const [deleteTask] = useDeleteTaskMutation(); // Hook for deleting tasks

  // Toggle the task completion (done) state
  function handleToggleDone() {
    updateTask({ ...task, done: !task.done }); // Use RTK Query mutation
  }

  // Update the task text
  function handleUpdateTask() {
    updateTask({ ...task, text: editText }); // Use RTK Query mutation
    setIsEditing(false);
  }

  // Delete the task
  function handleDeleteTask() {
    deleteTask(task.id); // Use RTK Query mutation
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

      {isEditing ? (
        <>
          <button onClick={handleUpdateTask} className="bg-green-500 text-white p-2 ml-2">
            Update
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 ml-2">
            Cancel
          </button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white p-2 ml-2">
          Edit
        </button>
      )}

      <button onClick={handleDeleteTask} className="bg-red-500 text-white p-2 ml-2">
        Delete
      </button>
    </li>
  );
}
