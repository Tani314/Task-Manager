import { useState, useEffect } from 'react';
import TaskService from '../services/task-service';
import { Task } from '../types/types';

interface TaskModalProps {
  date: Date | null;
  task: Task | null;
  onClose: () => void;
  onTaskUpdated: () => void;
}

const TaskModal = ({ date, task, onClose, onTaskUpdated }: TaskModalProps) => {
  const [title, setTitle] = useState(task?.Title || '');
  const [description, setDescription] = useState(task?.Description || '');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>(task?.Status || 'pending');
  const [dueDate, setDueDate] = useState(task?.DueDate.split('T')[0] || date?.toISOString().split('T')[0] || '');

  useEffect(() => {
    if (task) {
      setTitle(task.Title);
      setDescription(task.Description);
      setStatus(task.Status);
      setDueDate(task.DueDate.split('T')[0]);
    }
  }, [task]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (task) {
        // Update existing task
        await TaskService.updateTask(task.ID, { Title: title, Description: description, Status: status, DueDate: dueDate });
      } else {
        // Create new task
        await TaskService.createTask({ Title: title, Description: description, Status: status, DueDate: dueDate });
      }
      onTaskUpdated(); // Notify parent to refresh tasks
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-sky-400 p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">{task ? 'Update Task' : 'Add New Task'}</h2>
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
              required
            />
          </div>
          <div>
            <label className="block text-gray-800">Status</label>
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
            <label className="block text-gray-800">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">
              {task ? 'Update Task' : 'Add Task'}
            </button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
