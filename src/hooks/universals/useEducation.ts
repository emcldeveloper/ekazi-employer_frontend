import {
  getCourses,
  getEducationLevels,
  getMajors,
} from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useEducationLevels = () => {
  return useQuery({
    queryKey: ["education-levels"],
    queryFn: getEducationLevels,
  });
};

export const useCourses = (search: string, page = 1, limit = 50) => {
  return useQuery({
    queryKey: ["courses", search, page, limit],
    queryFn: () => getCourses(search, page, limit),
  });
};

export const useMajors = (search: string, page = 1, limit = 50) => {
  return useQuery({
    queryKey: ["majors", search, page, limit],
    queryFn: () => getMajors(search, page, limit),
  });
};
