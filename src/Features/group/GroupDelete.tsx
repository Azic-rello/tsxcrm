import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function GroupDel() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/Group")
      .then(res => setGroups(res.data || []))
      .catch(err => console.log(err));
  }, []);

  const refresh = () => {
    axios.get("http://localhost:5000/Group")
      .then(res => setGroups(res.data || []));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("O'chirmoqchimisiz?")) return;

    try {
      await axios.delete(`http://localhost:5000/Group/${id}`);
      refresh();
      alert("O'chirildi");
    } catch (err) {
      alert("O'chirishda xato");
      console.error(err);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#001e3c] shadow-[0px_0px_14px_#007ff5] p-8 md:p-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Guruh o'chirish
      </h2>

      <div className="overflow-x-auto rounded-lg border border-[#007ff5]/30">
        <table className="w-full text-left">
          <thead className="bg-[#0a1929]">
            <tr>
              <th className="p-4">Nomi</th>
              <th className="p-4">Xona</th>
              <th className="p-4">Vaqt</th>
              <th className="p-4">Kun</th>
              <th className="p-4 text-center">O'chirish</th>
            </tr>
          </thead>
          <tbody>
            {groups.map(g => (
              <tr key={g.id} className="hover:bg-[#0a1929]/70 transition-colors">
                <td className="p-4 border-t border-[#007ff5]/20">{g.nomi}</td>
                <td className="p-4 border-t border-[#007ff5]/20">{g.xona}</td>
                <td className="p-4 border-t border-[#007ff5]/20">{g.vaqt}</td>
                <td className="p-4 border-t border-[#007ff5]/20">{g.kun}</td>
                <td className="p-4 border-t border-[#007ff5]/20 text-center">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(g.id)}
                  >
                    O'chirish
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}