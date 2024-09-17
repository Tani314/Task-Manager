// components/AddTask.tsx
import { useState } from "react";
import TaskService from "../services/task-service";

interface AddTaskProps {
  onClose: () => void;
  onTaskAdded: () => void;
}

const AddTask = ({ onClose, onTaskAdded }: AddTaskProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending');
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        await TaskService.createTask({ 
            Title: title, 
            Description: description, 
            Status: status, 
            DueDate: dueDate 
          });
          
      onTaskAdded(); // Notify parent to refresh tasks
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="modal bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'pending' | 'in-progress' | 'completed')}
            className="border p-2 rounded w-full"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </form>
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
        &times;
      </button>
    </div>
  );
};

export default AddTask;
