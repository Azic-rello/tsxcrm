import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const GroupEdit = ({ group, rooms, onUpdate, onCancel }) => {
  const [nomi, setNomi] = useState(group.nomi);
  const [xona, setXona] = useState(group.xona);
  const [vaqt, setVaqt] = useState(group.vaqt);
  const [kun, setKun] = useState(group.kun);

  const handleUpdate = async () => {
    if (!nomi.trim() || !xona || !vaqt || !kun) {
      alert("Barcha maydonlarni to'ldiring!");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/Group/${group.id}`, {
        nomi,
        xona,
        vaqt,
        kun,
      });
      onUpdate();
    } catch (err) {
      console.error(err);
      alert("Yangilashda xato");
    }
  };

  return (
    <div className="grid gap-4 md:gap-6 mb-6">
      <Input
        value={nomi}
        onChange={(e) => setNomi(e.target.value)}
        placeholder="Guruh nomi"
      />
      <select
        className={cn(
          "h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm"
        )}
        value={xona}
        onChange={(e) => setXona(e.target.value)}
      >
        {rooms.map((r) => (
          <option key={r.id} value={r.name}>
            {r.name}
          </option>
        ))}
      </select>
      <select
        className={cn(
          "h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm"
        )}
        value={vaqt}
        onChange={(e) => setVaqt(e.target.value)}
      >
        <option value="08:00-10:00">08:00-10:00</option>
        <option value="10:00-12:00">10:00-12:00</option>
        <option value="14:00-16:00">14:00-16:00</option>
        <option value="16:00-18:00">16:00-18:00</option>
      </select>
      <select
        className={cn(
          "h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm"
        )}
        value={kun}
        onChange={(e) => setKun(e.target.value)}
      >
        <option value="Toq kunlar">Toq kunlar</option>
        <option value="Juft kunlar">Juft kunlar</option>
      </select>
      <div className="flex gap-2">
        <Button
          onClick={handleUpdate}
          className="bg-[#007ff5] hover:bg-[#0066cc] flex-1"
        >
          Saqlash
        </Button>
        <Button onClick={onCancel} variant="destructive" className="flex-1">
          Bekor qilish
        </Button>
      </div>
    </div>
  );
}

export default GroupEdit