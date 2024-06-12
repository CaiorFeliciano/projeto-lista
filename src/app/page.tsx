"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowLeft, ArrowRight, Search } from "lucide-react";
import { use, useEffect, useState } from "react";

//definindo a interface dos dados
interface Aluno {
  id_aluno: number;
  nome_aluno: string;
  email_aluno: string;
  id_plano: number;
  vencimento: string;
  ultimo_acesso: string;
}

const columns: ColumnDef<Aluno>[] = [
  { accessorKey: "id_aluno", header: "ID" },
  { accessorKey: "nome_aluno", header: "Nome" },
  { accessorKey: "email_aluno", header: "E-Mail" },
  { accessorKey: "id_plano", header: "Plano" },
  { accessorKey: "vencimento", header: "Vencimento" },
  { accessorKey: "ultimo_acesso", header: "Último Acesso" },
];

async function getData(): Promise<Aluno[]> {
  const res = await fetch("http://localhost:8080/alunos");
  if (!res.ok) {
    throw new Error("Falha em buscar os dados");
  }
  return res.json();
}

export default function Home() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [alunos, setALunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        console.log(data);
        setALunos(data);
      } catch (error) {
        console.error("Falha ao conseguir os dados", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const table = useReactTable({
    columns,
    data: alunos,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

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
            {table.getFlatHeaders().map((header) => (
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
