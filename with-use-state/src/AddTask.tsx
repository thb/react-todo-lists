/* src/AddTask.tsx */

import { useState } from 'react';

export default function AddTask({ onAddTask }: { onAddTask: (text: string) => void }) {
  const [text, setText] = useState('');

  return (
    <div className="mb-4 flex">
      <input
        className="mr-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
        placeholder="Enter a task"
      />
      <button
        className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        onClick={() => {
          if (text.trim()) {
            onAddTask(text);
            setText('');
          }
        }}
      >
        Add
      </button>
    </div>
  );
}
