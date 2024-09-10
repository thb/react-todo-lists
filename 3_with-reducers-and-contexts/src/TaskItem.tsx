// TaskItem.tsx
import { useState } from 'react';
import { Task } from './types';
import { useTasks } from './TaskContext';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleToggleDone() {
    dispatch({
      type: 'changed',
      task: { ...task, done: !task.done },
    });
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditText(e.target.value);
  }

  function handleUpdateTask() {
    dispatch({
      type: 'changed',
      task: { ...task, text: editText },
    });
    setIsEditing(false);
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setEditText(task.text); // Reset text if editing is canceled
  }

  function handleDeleteTask() {
    dispatch({
      type: 'deleted',
      id: task.id,
    });
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
          onChange={handleTextChange}
          className="flex-1 border p-2"
        />
      ) : (
        <span className={`flex-1 ${task.done ? 'line-through' : ''}`}>{task.text}</span>
      )}

      {isEditing ? (
        <>
          <button
            onClick={handleUpdateTask}
            className="bg-green-500 text-white p-2 ml-2"
          >
            Update
          </button>
          <button
            onClick={handleCancelEdit}
            className="bg-gray-500 text-white p-2 ml-2"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={handleEditClick}
          className="bg-blue-500 text-white p-2 ml-2"
        >
          Edit
        </button>
      )}

      <button
        onClick={handleDeleteTask}
        className="bg-red-500 text-white p-2 ml-2"
      >
        Delete
      </button>
    </li>
  );
}
