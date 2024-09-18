import { useState, useEffect } from "react";
import TaskService from "../services/task-service";
import axios from "../utils/axios"; // Assuming axios is set up with your base URL

interface AddTaskProps {
  date?: Date;
  task?: any;
  onClose: () => void;
  onTaskAdded: () => void;
}

interface Category {
  ID: number;
  Name: string;
  Description: string;
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let categoryId = selectedCategory;

      if (task) {
        await TaskService.updateTask(task.ID, {
          Title: title,
          Description: description,
          Status: status,
          DueDate: dueDate,
          CategoryID: categoryId, // Send the selected category ID
        });
      } else {
        await TaskService.createTask({
          Title: title,
          Description: description,
          Status: status,
          DueDate: dueDate,
          CategoryID: categoryId, // Send the selected category ID
        });
      }

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
              className="border text-gray-800 p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border text-gray-800 p-2 rounded w-full"
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
              className="border p-2 text-gray-800 rounded w-full"
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
              className="border text-gray-800 p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800">Category</label>
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="border p-2 text-gray-800 rounded w-full"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.ID} value={category.ID}>
                  {category.Name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">
            Add Task
          </button>
        </form>
        <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTask;
