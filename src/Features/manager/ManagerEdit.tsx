import { api } from "@/service/api";
import { useEffect, useState } from "react";

interface Manager {
  id: number;
  name: string;
  email: string;
}

const ManagerEdit = ({
  manager,
  onClose,
  onSuccess,
}: {
  manager: Manager | null;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (manager) {
      setName(manager.name);
      setEmail(manager.email);
    }
  }, [manager]);

  if (!manager) return null;

  const save = async () => {
    await api.put(`/managers/${manager.id}`, { name, email });
    onSuccess();
    onClose();
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
      <h3 className="font-semibold mb-2">Tahrirlash</h3>
      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={save}
          className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="border px-3 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ManagerEdit;