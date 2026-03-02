import { useEffect, useState } from "react";
import { api } from "../service/api";
import ManagerAdd from "@/Features/manager/ManagerAdd";
import ManagerEdit from "@/Features/manager/ManagerEdit";

interface Manager {
  id: number;
  name: string;
  email: string;
}

export default function Manager() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [editManager, setEditManager] = useState<Manager | null>(null);

  const getManagers = async () => {
    const res = await api.get("/managers");
    setManagers(res.data);
  };

  useEffect(() => {
    getManagers();
  }, []);

  const deleteManager = async (id: number) => {
    await api.delete(`/managers/${id}`);
    getManagers();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white">Managerlar</h1>

      <ManagerAdd onSuccess={getManagers} />

      <div className="overflow-x-auto shadow-sm rounded-lg">
        <table className="w-full border-collapse shadow-blue-200">
          <thead className="bg-gray-800 text-white uppercase text-sm  ">
            <tr>
              <th className="border p-3 text-left">#</th>
              <th className="border p-3 text-left">Ism</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((m, i) => (
              <tr
                key={m.id}
                className="text-gray-700 hover:bg-gray-50 transition"
              >
                <td className="border p-3">{i + 1}</td>
                <td className="border p-3">{m.name}</td>
                <td className="border p-3">{m.email}</td>
                <td className="border p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => setEditManager(m)}
                    className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => deleteManager(m.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    O‘chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ManagerEdit
        manager={editManager}
        onClose={() => setEditManager(null)}
        onSuccess={getManagers}
      />
    </div>
  );
}