import { useState } from "react";

interface EnvrolmentEditProps {
  envrolment: { id: string; studentId: string; groupId: string };
  students: { id: string; name: string }[];
  groups: { id: string; name: string }[];
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onUpdate(envrolment.id, {
      studentId,
      groupId,
    });
  };

  return (
    <tr className="bg-gray-800">
      <td className="py-3">
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded"
        >
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
          className="bg-gray-700 text-white p-2 rounded"
        >
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </td>

      <td className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-white"
        >
          Save
        </button>

        <button
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EnvrolmentEdit;
