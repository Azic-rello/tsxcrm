import { useState } from "react";

interface EnvrolmentAddProps {
  students: { id: string; name: string }[];
  groups: { id: string; nomi: string }[];
  onAdd: (data: { studentId: string; groupId: string }) => void;
}

const EnvrolmentAdd = ({ students, groups, onAdd }: EnvrolmentAddProps) => {
  const [studentId, setStudentId] = useState("");
  const [groupId, setGroupId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !groupId) return;

    onAdd({ studentId, groupId });

    setStudentId("");
    setGroupId("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl shadow-lg flex gap-4"
    >
      <select
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded-lg"
      >
        <option value="">Student tanlang</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded-lg"
      >
        <option value="">Group tanlang</option>
        {groups.map((g) => (
          <option key={g.id} value={g.id}>
            {g.nomi}
          </option>
        ))}
      </select>

      <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white">
        Add
      </button>
    </form>
  );
};

export default EnvrolmentAdd;
