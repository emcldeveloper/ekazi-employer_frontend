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

export const useCourses = () => {
  return useQuery({
    queryKey: ["education-courses"],
    queryFn: getCourses,
  });
};

export const useMajors = () => {
  return useQuery({
    queryKey: ["education-majors"],
    queryFn: getMajors,
  });
};
