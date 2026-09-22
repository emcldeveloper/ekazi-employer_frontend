import type { DemoForm } from "@/@types/request-demo";
import api from "@/lib/axios";

export const requestDemo = async (payload: DemoForm) => {
  const res = await api.post("/request-demo", payload);
  return res.data;
};
