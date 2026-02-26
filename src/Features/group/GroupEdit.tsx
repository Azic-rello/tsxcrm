import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function GroupEdit() {
  const [groups, setGroups] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [nomi, setNomi] = useState("");
  const [xona, setXona] = useState("");
  const [vaqt, setVaqt] = useState("");
  const [kun, setKun] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/Group").then(res => setGroups(res.data || []));
    axios.get("http://localhost:5000/Room").then(res => setRooms(res.data || []));
  }, []);

  const refreshGroups = () => {
    axios.get("http://localhost:5000/Group").then(res => setGroups(res.data || []));
  };

  const startEdit = (group) => {
    setEditingId(group.id);
    setNomi(group.nomi);
    setXona(group.xona);
    setVaqt(group.vaqt);
    setKun(group.kun);
  };

  const handleUpdate = async () => {
    if (!nomi.trim() || !xona || !vaqt || !kun) {
      alert("Barcha maydonlarni to'ldiring!");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/Group/${editingId}`, { nomi, xona, vaqt, kun });
      alert("Yangilandi!");
      setEditingId(null);
      refreshGroups();
    } catch (err) {
      alert("Yangilashda xato");
      console.error(err);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#001e3c] shadow-[0px_0px_14px_#007ff5] p-8 md:p-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Guruh tahrirlash
      </h2>

      {/* Jadval */}
      <div className="overflow-x-auto rounded-lg border border-[#007ff5]/30 mb-10">
        <table className="w-full text-left">
          <thead className="bg-[#0a1929]">
            <tr>
              <th className="p-4">Nomi</th>
              <th className="p-4">Xona</th>
              <th className="p-4">Vaqt</th>
              <th className="p-4">Kun</th>
              <th className="p-4 text-center">Tahrirlash</th>
            </tr>
          </thead>
          <tbody>
            {groups.map(g => (
              <tr key={g.id} className="hover:bg-[#0a1929]/70">
                <td className="p-4 border-t border-[#007ff5]/20">{g.nomi}</td>
                <td className="p-4 border-t border-[#007ff5]/20">{g.xona}</td>
                <td className="p-4 border-t border-[#007ff5]/20">{g.vaqt}</td>
                <td className="p-4 border-t border-[#007ff5]/20">{g.kun}</td>
                <td className="p-4 border-t border-[#007ff5]/20 text-center">
                  <Button
                    size="sm"
                    className="bg-[#007ff5] hover:bg-[#0060c0]"
                    onClick={() => startEdit(g)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tahrirlash formasi */}
      {editingId && (
        <div className="grid gap-6">
          <div>
            <label className="block mb-2 text-sm">Guruh nomi</label>
            <Input value={nomi} onChange={e => setNomi(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 text-sm">Xona</label>
            <select
              className={cn("h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:border-[#007ff5]")}
              value={xona}
              onChange={e => setXona(e.target.value)}
            >
              {rooms.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm">Vaqt</label>
            <select
              className={cn("h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:border-[#007ff5]")}
              value={vaqt}
              onChange={e => setVaqt(e.target.value)}
            >
              <option value="08:00-10:00">08:00-10:00</option>
              <option value="10:00-12:00">10:00-12:00</option>
              <option value="14:00-16:00">14:00-16:00</option>
              <option value="16:00-18:00">16:00-18:00</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm">Kun</label>
            <select
              className={cn("h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:border-[#007ff5]")}
              value={kun}
              onChange={e => setKun(e.target.value)}
            >
              <option value="Toq kunlar">Toq kunlar</option>
              <option value="Juft kunlar">Juft kunlar</option>
            </select>
          </div>

          <Button
            onClick={handleUpdate}
            className="mt-4 bg-[#007ff5] hover:bg-[#0066cc] h-12 text-lg w-full"
          >
            Saqlash
          </Button>
        </div>
      )}
    </div>
  );
}