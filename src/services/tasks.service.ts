import type { CreateTaskForm } from "@/@types/tasks";
import api from "@/lib/axios";

export const tasksList = async () => {
  const res = await api.get("/employer/tasks");
  return res.data;
};

export const taskDetails = async (id: number) => {
  const res = await api.get(`/employer/tasks/${id}`);
  return res.data?.data;
};

export const createTask = async (payload: CreateTaskForm) => {
  const res = await api.post("/employer/tasks", payload);
  return res.data;
};

export const updateTask = async ({
  id,
  payload,
}: {
  id: number;
  payload: CreateTaskForm;
}) => {
  const res = await api.put(`/employer/tasks/${id}`, payload);
  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await api.delete(`/employer/tasks/${id}`);
  return res.data;
};

export const assignTask = async ({
  task_id,
  user_id,
}: {
  task_id: number;
  user_id: number;
}) => {
  const res = await api.delete("/employer/task-assignments", {
    params: {
      task_id,
      user_id,
    },
  });
  return res.data;
};
