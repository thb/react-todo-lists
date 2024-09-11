import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from './types';
import { changeTask, deleteTask } from './actions';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleToggleDone() {
    dispatch(changeTask({ ...task, done: !task.done }));
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditText(e.target.value);
  }

  function handleUpdateTask() {
    dispatch(changeTask({ ...task, text: editText }));
    setIsEditing(false);
  }

  function handleDeleteTask() {
    dispatch(deleteTask(task.id));
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
