import { api } from "@/service/api";
import { useState } from "react";

const ManagerAdd = ({ onSuccess }: { onSuccess: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const add = async () => {
    if (!name || !email) return alert("To'ldir");
    await api.post("/managers", { name, email });
    setName("");
    setEmail("");
    onSuccess();
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h3 className="font-semibold mb-2 text-black">Add Manager</h3>
      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2 w-full text-black"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2 w-full text-black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={add}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ManagerAdd;