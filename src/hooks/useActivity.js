import { useQuery } from "@tanstack/react-query";
import { fetchActivityReport } from "../api/habits";

export const useActivityQuery = () => {
  return useQuery({
    queryKey: ["activity"],
    queryFn: fetchActivityReport,
  });
};
