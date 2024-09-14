'use client';

import { useState } from 'react';
import { createTask } from '@/actions/tasksActions';

export default function AddTask() {
  const [text, setText] = useState('');

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();

    if (text.trim()) {
      await createTask(text);
      setText(''); // Clear the input
    }
  }

  return (
    <form onSubmit={handleAddTask}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 w-full"
        placeholder="Add a new task"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
        Add Task
      </button>
    </form>
  );
}
