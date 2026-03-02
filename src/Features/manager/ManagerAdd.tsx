import { api } from "@/service/api";
import { useState } from "react";

export default function ManagerAdd({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

 const addManager = async () => {
  if (!name || !email) return;

  try {
    await api.post("/managers", { name, email });
    setName("");
    setEmail("");
    onSuccess?.();
  } catch (error) {
    console.error("POST xato:", error);
  }
};
 

  return (
    <div className="bg-white shadow rounded p-4 space-y-3">
      <h2 className="font-semibold text-lg">Manager qo'shish</h2>

      <input
        className="w-full border p-2 rounded border-black text-black"
        placeholder="Ism"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded border-black text-black"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={addManager}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Qo‘shish
      </button>
    </div>
  );
}