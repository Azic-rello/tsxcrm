import { useEffect, useState } from "react";
import { api } from "../../service/api";
import ManagerAdd from "../manager/ManagerAdd";
import ManagerEdit from "../manager/ManagerEdit";

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
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Managerlar</h1>

      <ManagerAdd onSuccess={getManagers} />

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Ism</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((m, i) => (
            <tr key={m.id} className="text-center">
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{m.name}</td>
              <td className="border p-2">{m.email}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditManager(m)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Tahrirlash
                </button>
                <button
                  onClick={() => deleteManager(m.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  O‘chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ManagerEdit
        manager={editManager}
        onClose={() => setEditManager(null)}
        onSuccess={getManagers}
      />
    </div>
  );
}