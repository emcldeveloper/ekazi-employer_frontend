import {
  getCourses,
  getEducationLevels,
  getMajors,
} from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useEducationLevels = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryFn: () => getEducationLevels(search, page, limit),
    queryKey: ["education-levels", search, page, limit],
  });
};

export const useCourses = (search = "", page = 1, limit = 50) => {
  return useQuery({
    queryKey: ["courses", search, page, limit],
    queryFn: () => getCourses(search, page, limit),
  });
};

export const useMajors = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryKey: ["majors", search, page, limit],
    queryFn: () => getMajors(search, page, limit),
  });
};
