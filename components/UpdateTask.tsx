import { useState } from "react";
import { Task } from "../types/types";
import TaskService from "../services/task-service";

interface UpdateTaskProps {
  task: Task;
  onClose: () => void;
  onTaskUpdated: () => void;
}

const UpdateTask = ({ task, onClose, onTaskUpdated }: UpdateTaskProps) => {
  const [title, setTitle] = useState(task.Title);
  const [description, setDescription] = useState(task.Description);
  const [dueDate, setDueDate] = useState(new Date(task.DueDate).toISOString().split('T')[0]);
  const [status, setStatus] = useState(task.Status);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await TaskService.updateTask(task.ID, { Title: title, Description: description, DueDate: dueDate, Status: status });
      onTaskUpdated();  // Notify parent component to refresh the task list
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Update Task</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateTask;
