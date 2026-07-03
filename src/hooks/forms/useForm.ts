import { getForm } from "@/services/forms.service";
import { useQuery } from "@tanstack/react-query";

export const useForm = (id: string) =>
  useQuery({
    queryKey: ["forms", id],
    queryFn: () => getForm(id),
    enabled: !!id,
  });
