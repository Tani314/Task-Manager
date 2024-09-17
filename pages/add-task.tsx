// components/AddTask.tsx
import { useState } from "react";
import TaskService from "../services/task-service";

interface AddTaskProps {
  date?: Date;
  task?: any;
  onClose: () => void;
  onTaskAdded: () => void;
}

const AddTask = ({ date, task, onClose, onTaskAdded }: AddTaskProps) => {
  const [title, setTitle] = useState(task?.Title || "");
  const [description, setDescription] = useState(task?.Description || "");
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed">(
    "pending"
  );
  const [dueDate, setDueDate] = useState(
    task?.DueDate.split("T")[0] || date?.toISOString().split("T")[0] || ""
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (task) {
        await TaskService.updateTask(task.ID, {
          Title: title,
          Description: description,
          Status: status,
          DueDate: dueDate,
        });
      }
      await TaskService.createTask({
        Title: title,
        Description: description,
        Status: status,
        DueDate: dueDate,
      });

      onTaskAdded(); // Notify parent to refresh tasks
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-sky-400 p-6 rounded shadow-lg max-w-sm w-full">
      <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-800">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-800">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-800">Status</label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as "pending" | "in-progress" | "completed"
              )
            }
            className="border p-2 rounded w-full"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-800">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">
          Add Task
        </button>
      </form>
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

export default AddTask;
