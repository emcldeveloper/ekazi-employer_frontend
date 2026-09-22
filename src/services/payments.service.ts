import api from "@/lib/axios";

export const getPaymentStatus = async (reference: string) => {
  const res = await api.get("/notifications/stream", {
    params: { reference },
  });

  return res.data;
};
