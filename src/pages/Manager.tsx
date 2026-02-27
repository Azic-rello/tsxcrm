import { useEffect, useState } from "react";
import ManagerAdd from "../Features/manager/ManagerAdd";
import ManagerEdit from "../Features/manager/ManagerEdit";
import ManagerDelete from "../Features/manager/ManagerDalete";
import { api } from "@/service/api";

interface Manager {
  id: number;
  name: string;
  email: string;
}

const Manager = () => {
  const [data, setData] = useState<Manager[]>([]);
  const [edit, setEdit] = useState<Manager | null>(null);

  const load = async () => {
    const res = await api.get("/managers");
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-black">Manager</h1>

        <ManagerAdd onSuccess={load} />
        <ManagerEdit manager={edit} onClose={() => setEdit(null)} onSuccess={load} />

        <div className="bg-white rounded-xl shadow divide-y">
          {data.map((m) => (
            <div key={m.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-gray-500">{m.email}</div>
              </div>
              <div>
                <button
                  onClick={() => setEdit(m)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </button>
                <ManagerDelete id={m.id} onSuccess={load} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Manager;