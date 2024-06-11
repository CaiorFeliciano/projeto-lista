"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowLeft, ArrowRight, Search } from "lucide-react";
import { use, useState } from "react";
import data from "./data.json";

const columns: ColumnDef<(typeof data)[0]>[] = [
  { accessorKey: "id_aluno", header: "ID" },
  { accessorKey: "nome_aluno", header: "Nome" },
  { accessorKey: "email_aluno", header: "E-Mail" },
  { accessorKey: "id_plano", header: "Plano" },
  { accessorKey: "vencimento", header: "Vencimento" },
  { accessorKey: "ultimo_acesso", header: "Último Acesso" },
];

async function getData() {
  const res = await fetch("http://localhost:8080/alunos");
  return res.json();
}

export default function Home() {
  const [globalFilter, setGlobalFilter] = useState("");
  const alunos = use(getData());
  const table = useReactTable({
    columns,
    alunos,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
                  <ArrowDown size={16} className="cursor-pointer" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().alunos.map((aluno) => (
            <tr key={aluno.id}>
              {aluno.getVisibleCells().map((cell) => (
                <td>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-12">
        <ArrowLeft className="cursor-pointer" />
        <span>1</span>
        <ArrowRight className="cursor-pointer" />
      </div>
    </main>
  );
}
