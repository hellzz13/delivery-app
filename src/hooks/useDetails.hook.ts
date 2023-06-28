import { useQuery } from "react-query";

export function useDetails<T>(
  fetchData: (id: string) => Promise<T>,
  id: string,
  queryKey: string
) {
  const { data } = useQuery([queryKey, id], () => fetchData(id));

  return {
    data,
  };
}
