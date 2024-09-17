// components/UpdateTask.tsx
import React from 'react';
import { Task } from '../types/types'; // Adjust path if necessary

interface UpdateTaskProps {
  task: Task;
  onClose: () => void;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({ task, onClose }) => {
  // Component implementation

  return (
    <div>
      <h2>Update Task</h2>
      {/* Form or task update logic */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default UpdateTask;
