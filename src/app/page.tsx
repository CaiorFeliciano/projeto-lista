"use client";

import { ArrowDown, ArrowLeft, ArrowRight, Search } from "lucide-react";
import data from "./data.json";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

const columns: ColumnDef<(typeof data)[0]>[] = [
  { accessorKey: "aluno", header: "Aluno" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "email", header: "E-Mail" },
  { accessorKey: "plano", header: "Plano" },
  { accessorKey: "vencimento", header: "Vencimento" },
  { accessorKey: "ultimo_acesso", header: "Último Acesso" },
];

export default function Home() {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    columns,
    data,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <main className="my-6 mx-2">
      <div className="mb-2 flex items-center relative">
        <Search size={16} className="absolute left-2 text-black opacity-25" />
        <input
          type="text"
          className="input input-info input-sm pl-8"
          placeholder="Pesquisar..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            {table.getHeaderGroups()[0].headers.map((header) => (
              <th key={header.id}>
                <div className="flex">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}{" "}
                  <ArrowDown
                    size={16}
                    className="cursor-pointer"
                    onClick={() => header.column.toggleSorting(false)}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-12">
        {table.getCanPreviousPage() && (
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => table.previousPage()}
          />
        )}
        <span>{table.getState().pagination.pageIndex + 1}</span>
        {table.getCanNextPage() && (
          <ArrowRight
            className="cursor-pointer"
            onClick={() => table.nextPage()}
          />
        )}
      </div>
    </main>
  );
}
