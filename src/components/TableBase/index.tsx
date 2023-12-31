import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import dayjs from "dayjs";
import { Column } from "@/models/Columns";
import { usePathname, useRouter } from "next/navigation";

type ITableBase<T> = {
  rows: T[];
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columns: readonly Column[];
};

export default function TableBase<T>({
  rows,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  columns,
}: ITableBase<T>) {
  const { push } = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color: "#fff" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ cursor: "pointer" }}
                          onClick={() => push(`${pathname}/${row.id}`)}
                        >
                          {column.id === "inicioDeslocamento" ||
                          column.id === "vencimentoHabilitacao"
                            ? dayjs(value).format("DD/MM/YYYY")
                            : column.id === "fimDeslocamento"
                            ? value
                              ? "Concluido"
                              : "Em andamento"
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
