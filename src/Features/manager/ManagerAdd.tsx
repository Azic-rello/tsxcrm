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
    <div className="bg-gray-800 shadow-lg rounded-xl p-6 space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white">Manager qo'shish</h2>

      <input
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        placeholder="Ism"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={addManager}
        className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Qo‘shish
      </button>
    </div>
  );
}