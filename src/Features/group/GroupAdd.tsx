import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const GroupAdd = ({ rooms, onAdd }) => {
  const [nomi, setNomi] = useState("");
  const [xona, setXona] = useState("");
  const [vaqt, setVaqt] = useState("");
  const [kun, setKun] = useState("");
  const [error, setError] = useState("");

  const handleAdd = async () => {
    setError("");
    if (!nomi.trim() || !xona || !vaqt || !kun) {
      setError("Barcha maydonlarni to'ldiring!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/Group", {
        nomi,
        xona,
        vaqt,
        kun,
      });
      setNomi("");
      setXona("");
      setVaqt("");
      setKun("");
      onAdd();
    } catch (err) {
      console.error(err);
      setError("Qo'shishda xatolik yuz berdi");
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#001e3c] shadow-[0px_0px_14px_#007ff5] p-6 md:p-8 mb-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Guruh qo'shish
      </h2>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      <div className="grid gap-4 md:gap-6">
        <Input
          placeholder="Guruh nomi"
          value={nomi}
          onChange={(e) => setNomi(e.target.value)}
        />
        <select
          className={cn(
            "h-10 w-full rounded-md border px-3 py-2 text-sm focus:border-[#007ff5]"
          )}
          value={xona}
          onChange={(e) => setXona(e.target.value)}
        >
          <option value="">Xona tanlang</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
        <select
          className={cn(
            "h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:border-[#007ff5]"
          )}
          value={vaqt}
          onChange={(e) => setVaqt(e.target.value)}
        >
          <option value="">Vaqt tanlang</option>
          <option value="08:00-10:00">08:00-10:00</option>
          <option value="10:00-12:00">10:00-12:00</option>
          <option value="14:00-16:00">14:00-16:00</option>
          <option value="16:00-18:00">16:00-18:00</option>
        </select>
        <select
          className={cn(
            "h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:border-[#007ff5]"
          )}
          value={kun}
          onChange={(e) => setKun(e.target.value)}
        >
          <option value="">Kun tanlang</option>
          <option value="Toq kunlar">Toq kunlar</option>
          <option value="Juft kunlar">Juft kunlar</option>
        </select>
        <Button
          onClick={handleAdd}
          className="mt-2 w-full bg-[#007ff5] hover:bg-[#0066cc]"
        >
          Qo'shish
        </Button>
      </div>
    </div>
  );
}

export default GroupAdd