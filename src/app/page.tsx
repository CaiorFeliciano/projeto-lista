import { ArrowDown, Search } from "lucide-react";
import data from "./data.json";

const headers = [
  "Aluno",
  "Status",
  "E-mail",
  "Plano",
  "Vencimento",
  "Último Acesso",
];

export default function Home() {
  return (
    <main className="my-6 mx-2">
      <div className="mb-2 flex items-center relative">
        <Search size={16} className="absolute left-2 text-black opacity-25" />
        <input
          type="text"
          className="input input-info input-sm pl-8"
          placeholder="Pesquisar..."
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>
                <div className="flex gap-2">
                  {header} <ArrowDown size={16} className="cursor-pointer" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.aluno}</td>
              <td>{item.status}</td>
              <td>{item.email}</td>
              <td>{item.plano}</td>
              <td>{item.vencimento}</td>
              <td>{item.ultimo_acesso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
