import { useState } from "react";

const AssignmentEdit = ({ assignment, Teacher, groups }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [teacherId, setTeacherId] = useState(assignment.teacherId);
  const [groupId, setGroupId] = useState(assignment.groupId);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);

    await fetch(`http://localhost:5000/assignments/${assignment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherId: Number(teacherId),
        groupId: Number(groupId),
      }),
    });

    setLoading(false);
    setIsEditing(false);
    window.location.reload();
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="bg-none border-2 border-yellow-600 text-yellow-600 px-4 py-1 rounded hover:bg-yellow-600 hover:text-white"
      >
        Tahrirlash
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <select
        value={teacherId}
        onChange={(e) => setTeacherId(e.target.value)}
        className="border p-1 rounded"
      >
        {Teacher.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
        className="border p-1 rounded"
      >
        {groups.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        {loading ? "Saqlanmoqda..." : "Saqlash"}
      </button>

      <button
        onClick={() => setIsEditing(false)}
        className="bg-gray-400 text-white px-3 py-1 rounded"
      >
        Bekor
      </button>
    </div>
  );
};

export default AssignmentEdit;