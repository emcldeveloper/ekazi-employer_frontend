import { metaKeywords } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useMetaKeywords = (
  search: string = "",
  page: number = 1,
  limit: number = 50,
) => {
  return useQuery({
    queryFn: () => metaKeywords(search, page, limit),
    queryKey: ["meta-keywords", search, page, limit],
  });
};
