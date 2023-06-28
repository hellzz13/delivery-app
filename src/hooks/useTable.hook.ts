import * as React from "react";
import { useQuery } from "react-query";

export function useTable<T>(fetchData: () => Promise<T[]>, queryKey: string) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [data, setData] = React.useState<T[] | null>(null);

  const rows = data;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function useData() {
    return useQuery(
      [queryKey],
      async () => {
        return fetchData().then((res) => setData(res));
      },

      { staleTime: 1000, refetchInterval: 30000 }
    );
  }

  useData();

  return {
    page,
    rowsPerPage,
    rows,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}
