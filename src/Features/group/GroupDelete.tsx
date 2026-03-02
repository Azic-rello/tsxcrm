import { Button } from "@/components/ui/button";

const GroupDel = ({ groups, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#007ff5]/30">
      <table className="w-full text-left">
        <thead className="bg-[#0a1929]">
          <tr>
            <th className="p-4">Nomi</th>
            <th className="p-4">Xona</th>
            <th className="p-4">Vaqt</th>
            <th className="p-4">Kun</th>
            <th className="p-4 text-center">Harakat</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(g => (
            <tr key={g.id} className="hover:bg-[#0a1929]/70">
              <td className="p-4 border-t border-[#007ff5]/20">{g.nomi}</td>
              <td className="p-4 border-t border-[#007ff5]/20">{g.xona}</td>
              <td className="p-4 border-t border-[#007ff5]/20">{g.vaqt}</td>
              <td className="p-4 border-t border-[#007ff5]/20">{g.kun}</td>
              <td className="p-4 border-t border-[#007ff5]/20 text-center flex justify-center gap-2">
                <Button size="sm" className="bg-[#007ff5] hover:bg-[#0060c0]" onClick={() => onEdit(g)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(g.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GroupDel

