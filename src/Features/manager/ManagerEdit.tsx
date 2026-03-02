import { useState, useEffect } from "react";
import { api } from "../../service/api";

interface Manager {
  id: number;
  name: string;
  email: string;
}

export default function ManagerEdit({
  manager,
  onClose,
  onSuccess,
}: {
  manager: Manager | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (manager) {
      setName(manager.name);
      setEmail(manager.email);
    }
  }, [manager]);

  if (!manager) return null;

  const updateManager = async () => {
    await api.put(`/managers/${manager.id}`, { name, email });
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4 shadow-lg transition-transform transform scale-100">
        <h2 className="text-2xl font-bold text-gray-800">Manager tahrirlash</h2>

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ism"
        />

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Bekor
          </button>
          <button
            onClick={updateManager}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}