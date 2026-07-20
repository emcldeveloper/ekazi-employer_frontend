export type Priority = "High" | "Medium" | "Low";

export type TaskStatus = "Pending" | "InProgress" | "Completed";

export type CreateTaskForm = {
  title: string;
  description?: string;
  deadline?: string;
  priority?: Priority;
  status?: TaskStatus;
};
