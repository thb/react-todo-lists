import { useState } from 'react';
import { useTaskStore } from './useTaskStore';

export default function AddTask() {
  const [text, setText] = useState('');
  const addTask = useTaskStore((state) => state.addTask);

  function handleAddTask() {
    if (text.trim()) {
      addTask({ id: Date.now(), text: text, done: false });
      setText(''); // Clear input field after adding the task
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
      <button
        onClick={handleAddTask}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
    </div>
  );
}