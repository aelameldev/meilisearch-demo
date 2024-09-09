import {useQuery} from "@tanstack/react-query";
import api from "../lib/api";
import {PaginatedResponse, Property} from "@/types";

interface UsePropertiesProps {
  criteria: Record<string, any>
}

export const useProperties = ({criteria}: UsePropertiesProps) => {

  return useQuery<PaginatedResponse<Property>>({
    queryKey: ['properties', criteria],
    queryFn: async () => api('/properties', {params: criteria}),
  });

}