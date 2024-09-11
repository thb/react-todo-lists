import { useState } from 'react';
import { useCreateTask } from './queries';

export default function AddTask() {
  const [text, setText] = useState('');

  // Mutation for creating a new task
  const { mutate: mutateCreateTask } = useCreateTask();

  function handleAddTask() {
    if (text.trim()) {
      // Use the mutation to create a task
      mutateCreateTask({ text: text, done: false });
      setText('');
    }
  }

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 w-full"
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 mt-2">
        Add Task
      </button>
    </div>
  );
}
