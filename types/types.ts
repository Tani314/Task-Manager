// types.ts

export interface Task {
    ID: number;
    Title: string;
    Description: string;
    Status: 'pending' | 'in-progress' | 'completed';
    DueDate: string; // ISO 8601 date format
    CreatedAt: string; // ISO 8601 date format
    UpdatedAt: string; // ISO 8601 date format
  }
  