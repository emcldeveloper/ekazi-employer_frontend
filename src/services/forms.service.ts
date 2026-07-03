import test from "@/lib/test";
import type { Form, CreateFormDto, UpdateFormDto } from "@/@types/forms";

export const getForms = async (): Promise<Form[]> => {
  const { data } = await test.get("/forms");
  return data;
};

export const getForm = async (id: string): Promise<Form> => {
  const { data } = await test.get(`/forms/${id}`);
  return data;
};

export const createForm = async (payload: CreateFormDto): Promise<Form> => {
  const { data } = await test.post("/forms", payload);
  return data;
};

export const updateForm = async (
  id: string,
  payload: UpdateFormDto,
): Promise<Form> => {
  const { data } = await test.patch(`/forms/${id}`, payload);
  return data;
};

export const deleteForm = async (id: string): Promise<void> => {
  await test.delete(`/forms/${id}`);
};
