import { useState } from 'react';
import { Task } from './types';
import { useDeleteTask, useUpdateTask } from './queries';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  // Mutation for updating a task
  const { mutate: mutateUpdateTask } = useUpdateTask()
  const { mutate: mutateDeleteTask } = useDeleteTask()

  // Toggle the task completion (done) state
  function handleToggleDone() {
    mutateUpdateTask({ ...task, done: !task.done });
  }

  // Update the task text
  function handleUpdateTask() {
    mutateUpdateTask({ ...task, text: editText });
    setIsEditing(false);
  }

  // Delete the task
  function handleDeleteTask() {
    mutateDeleteTask(task.id);
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
