import type { CreateTaskForm } from "@/@types/tasks";
import api from "@/lib/axios";

export const tasksList = async (page = 1, limit = 25, search = "") => {
  const res = await api.get("/tasks", {
    params: {
      page,
      limit,
      search,
    },
  });
  return res.data;
};

export const taskDetails = async (id: number) => {
  const res = await api.get(`/tasks/${id}`);
  return res.data?.data;
};

export const createTask = async (payload: CreateTaskForm) => {
  const res = await api.post("/tasks", payload);
  return res.data;
};

export const updateTask = async ({
  id,
  payload,
}: {
  id: number;
  payload: CreateTaskForm;
}) => {
  const res = await api.put(`/tasks/${id}`, payload);
  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};

export const assignTask = async ({
  task_id,
  user_id,
}: {
  task_id: number;
  user_id: number;
}) => {
  const res = await api.delete("/task-assignments", {
    params: {
      task_id,
      user_id,
    },
  });
  return res.data;
};
