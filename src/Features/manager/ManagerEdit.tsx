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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 space-y-3">
        <h2 className="font-semibold text-lg">Manager tahrirlash</h2>

        <input
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Bekor
          </button>
          <button
            onClick={updateManager}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}