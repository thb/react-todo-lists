import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from './slices/tasksSlice'; // Import the async thunk
import { AppDispatch } from './store'; // Import the AppDispatch type

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch: AppDispatch = useDispatch(); // Type the dispatch function as AppDispatch

  function handleAddTask() {
    if (text.trim()) {
      // Dispatch the createTask thunk action
      dispatch(createTask({ text: text, done: false }));
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
