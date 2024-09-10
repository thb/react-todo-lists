import { useState } from 'react';
import { connect } from 'react-redux';
import { addTask } from './actions';

interface AddTaskProps {
  addTask: (id: number, text: string) => void;
}

function AddTask({ addTask }: AddTaskProps) {
  const [text, setText] = useState('');

  function handleAddTask() {
    if (text.trim()) {
      addTask(Date.now(), text);
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

// Connect to Redux
export default connect(null, { addTask })(AddTask);
