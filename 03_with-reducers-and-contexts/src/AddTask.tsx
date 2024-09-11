import { useState } from 'react';
import { useTasks } from './TaskContext';

export default function AddTask() {
  const [text, setText] = useState('');
  const { dispatch } = useTasks();

  function handleAddTask() {
    if (text.trim()) {
      dispatch({
        type: 'added',
        id: Date.now(),
        text: text,
      });
      setText(''); // Clear the input field after adding the task
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
