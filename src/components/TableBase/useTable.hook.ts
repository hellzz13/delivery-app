import * as React from "react";

export function useTable<T>(fetchData: () => Promise<T[]>) {
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

  React.useEffect(() => {
    fetchData().then((res) => setData(res));
  }, []);

  return {
    page,
    rowsPerPage,
    rows,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}
