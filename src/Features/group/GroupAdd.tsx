import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function GroupAdd() {
  const [rooms, setRooms] = useState([]);
  const [nomi, setNomi] = useState("");
  const [xona, setXona] = useState("");
  const [vaqt, setVaqt] = useState("");
  const [kun, setKun] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/Room")
      .then(res => setRooms(res.data || []))
      .catch(err => console.error("Xonalar yuklanmadi", err));
  }, []);

  const handleAdd = async () => {
    setError("");

    if (!nomi.trim() || !xona || !vaqt || !kun) {
      setError("Barcha maydonlarni to'ldiring!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/Group", { nomi, xona, vaqt, kun });
      setNomi("");
      setXona("");
      setVaqt("");
      setKun("");
      alert("Guruh qo'shildi!");
    } catch (err) {
      console.error(err);
      setError("Qo'shishda xatolik yuz berdi");
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#001e3c] shadow-[0px_0px_14px_#007ff5] p-8 md:p-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Guruh qo'shish
      </h2>

      {error && <p className="text-red-400 text-center mb-6">{error}</p>}

      <div className="grid gap-6">
        <div>
          <label className="block mb-2 text-sm">Guruh nomi</label>
          <Input
            value={nomi}
            onChange={e => setNomi(e.target.value)}
            className="bg-[#0a1929] border-[#007ff5]/50 focus:border-[#007ff5]"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Xona</label>
          <select
            className={cn("h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:border-[#007ff5] focus:ring-[#007ff5]/30")}
            value={xona}
            onChange={e => setXona(e.target.value)}
          >
            <option value="">Xona tanlang</option>
            {rooms.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm">Vaqt</label>
          <select
            className={cn("h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:border-[#007ff5] focus:ring-[#007ff5]/30")}
            value={vaqt}
            onChange={e => setVaqt(e.target.value)}
          >
            <option value="">Vaqt tanlang</option>
            <option value="08:00-10:00">08:00-10:00</option>
            <option value="10:00-12:00">10:00-12:00</option>
            <option value="14:00-16:00">14:00-16:00</option>
            <option value="16:00-18:00">16:00-18:00</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm">Kun</label>
          <select
            className={cn("h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:border-[#007ff5] focus:ring-[#007ff5]/30")}
            value={kun}
            onChange={e => setKun(e.target.value)}
          >
            <option value="">Kun tanlang</option>
            <option value="Toq kunlar">Toq kunlar</option>
            <option value="Juft kunlar">Juft kunlar</option>
          </select>
        </div>

        <Button
          onClick={handleAdd}
          className="mt-4 bg-[#007ff5] hover:bg-[#0066cc] h-12 text-lg w-full"
        >
          Qo'shish
        </Button>
      </div>
    </div>
  );
}