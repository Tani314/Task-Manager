"use client";

import React, { useEffect, useState } from "react";
import axios from "../utils/axios"; // Assuming axios is set up with your base URL

interface Category {
  ID: number;
  Name: string;
  Description: string;
}
interface Task {
  ID: number;
  Title: string;
  Description: string;
  Status: string;
  DueDate: string;
  Completed: boolean;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>("/categories");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await axios.get(`/tasks/by-category?categoryID=${categoryId}`);
      setTasks(response.data);
      setSelectedCategory(
        categories.find((cat) => cat.ID === categoryId) || null
      );
      setModalOpen(true);
    } catch (err) {
      setError("Failed to fetch tasks.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
    setTasks([]);
  };

  return (
    <div className="p-4 rounded shadow-md">
      <h1 className="text-3xl mb-4">Task Categories</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul>
        {categories.map((category) => (
          <li
            key={category.ID}
            onClick={() => handleCategoryClick(category.ID)}
            className="cursor-pointer border p-4 mb-4 rounded shadow hover:bg-gray-100"
          >
            <h2 className="text-xl font-semibold">{category.Name}</h2>
            <p >{category.Description}</p>
          </li>
        ))}
      </ul>

      {modalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-700 text-2xl"
            >
             &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">
              Tasks in "{selectedCategory.Name}"
            </h2>
            <ul>
              {tasks.map((task) => (
                <li key={task.ID} className="mb-4 border-b pb-2">
                  <h3 className="text-lg font-semibold">{task.Title}</h3>
                  <p className="text-gray-700">{task.Description}</p>
                  <p>
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        task.Completed ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {task.Status}
                    </span>
                  </p>
                  <p>Due Date: {new Date(task.DueDate).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
