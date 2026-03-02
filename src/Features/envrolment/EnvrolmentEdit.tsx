import { useState } from "react";

interface Student {
  id: string;
  name: string;
}
interface Group {
  id: string;
  nomi: string;
}
interface Enrolment {
  id: string;
  studentId: string;
  groupId: string;
}

interface EnvrolmentEditProps {
  envrolment: Enrolment;
  students: Student[];
  groups: Group[];
  onUpdate: (id: string, data: { studentId: string; groupId: string }) => void;
  onCancel: () => void;
}

const EnvrolmentEdit = ({
  envrolment,
  students,
  groups,
  onUpdate,
  onCancel,
}: EnvrolmentEditProps) => {
  const [studentId, setStudentId] = useState(envrolment.studentId);
  const [groupId, setGroupId] = useState(envrolment.groupId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !groupId) return;
    onUpdate(envrolment.id, { studentId, groupId });
  };

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700/40 transition">
      <td className="py-4">
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-lg w-full"
        >
          <option value="">Student tanlang</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-lg w-full"
        >
          <option value="">Group tanlang</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.nomi}
            </option>
          ))}
        </select>
      </td>
      <td className="flex gap-3 py-2">
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-white"
        >
          💾 Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-xl text-white"
        >
          ❌ Cancel
        </button>
      </td>
    </tr>
  );
};

export default EnvrolmentEdit;

