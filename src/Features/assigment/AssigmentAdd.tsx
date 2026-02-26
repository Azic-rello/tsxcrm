import { useState } from "react";

const AssignmentAdd = ({ teachers, groups, onAdd }) => {
  const [teacherId, setTeacherId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teacherId || !groupId) {
      alert("Iltimos, o`qituvchi va guruhni tanlang");
      return;
    }

    setLoading(true);

    await fetch("http://localhost:3000/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherId: Number(teacherId),
        groupId: Number(groupId),
      }),
    });

    setTeacherId("");
    setGroupId("");
    setLoading(false);
    if (onAdd) onAdd();
  };

  return (
    <div className="border-4 border-gray-700 p-6 rounded-xl bg-none">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Yangi biriktirish qo`shish
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <div className="flex flex-col w-1/3">
          <label className="mb-1 text-white-400">O`qituvchi</label>
          <select
            className="border p-2 rounded text-gray-400"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          >
            <option value="">O`qituvchini tanlang</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-1/3">
          <label className="mb-1 text-white">Guruh</label>
          <select
            className="border p-2 rounded text-gray-400"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          >
            <option value="">Guruhni tanlang</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saqlanmoqda..." : "Biriktirish"}
        </button>
      </form>
    </div>
  );
};

export default AssignmentAdd;