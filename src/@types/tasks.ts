export type Priority = "High" | "Medium" | "Low";

export type TaskStatus = "Pending" | "InProgress" | "Completed";

export type CreateTaskForm = {
  title: string;
  description?: string;
  deadline?: string;
  priority?: Priority;
  status?: TaskStatus;
  assignees: number[];
  attachments: File[];
};

export type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: Priority;
  status: TaskStatus;
  created_by: number;
  created_at: string;
  updated_at: string;
  assignments: Assignment[];
};

export type Assignment = {
  id: number;
  email: string;
  name: string;
};
