import { useQuery } from "@tanstack/react-query";
import { fetchActivityReport } from "../api/habits";

export const useActivityQuery = () => {
  const token = localStorage.getItem("access_token");
  return useQuery({
    queryKey: ["activity"],
    queryFn: fetchActivityReport,
    enabled: !!token,
  });
};
