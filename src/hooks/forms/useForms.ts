import { getForms } from "@/services/forms.service";
import { useQuery } from "@tanstack/react-query";

export const useForms = () =>
  useQuery({
    queryKey: ["forms"],
    queryFn: getForms,
  });
