import { useState } from 'react';
import { addTask } from './slices/tasksSlice';
import { useDispatch } from 'react-redux';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useDispatch(); // Use dispatch from react-redux

  function handleAddTask() {
    if (text.trim()) {
      dispatch(addTask({ id: Date.now(), text: text }));
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
