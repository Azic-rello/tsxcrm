import { useEffect, useMemo, useState } from "react";
import {
  getStudents,
  getGroups,
  getEnvrolments,
  addEnvrolment,
  deleteEnvrolment,
  updateEnvrolment,
} from "../service/api";

import EnvrolmentAdd from "../Features/envrolment/EnvrolmentAdd";
import EnvrolmentDelete from "../Features/envrolment/EnvrolmentDelete";
import EnvrolmentEdit from "../Features/envrolment/EnvrolmentEdit";

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

const Envrolment = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [enrolments, setEnrolments] = useState<Enrolment[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const fetchData = async () => {
    const [s, g, e] = await Promise.all([
      getStudents(),
      getGroups(),
      getEnvrolments(),
    ]);

    setStudents(s.data);
    setGroups(g.data);
    setEnrolments(e.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const studentMap = useMemo(
    () => Object.fromEntries(students.map((s) => [s.id, s])),
    [students],
  );

  const groupMap = useMemo(
    () => Object.fromEntries(groups.map((g) => [g.id, g])),
    [groups],
  );

  const handleAdd = async (data: { studentId: string; groupId: string }) => {
    await addEnvrolment(data);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await deleteEnvrolment(id);
    fetchData();
  };

  const handleUpdate = async (
    id: string,
    data: { studentId: string; groupId: string },
  ) => {
    await updateEnvrolment(id, data);
    setEditingId(null);
    fetchData();
  };

  const filtered = enrolments.filter((e) => {
    const student = studentMap[e.studentId];
    const group = groupMap[e.groupId];
    return (
      student?.name.toLowerCase().includes(search.toLowerCase()) ||
      group?.nomi.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 flex">
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8">Enrolment Management</h1>

        <input
          type="text"
          placeholder="Search student or group..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl bg-[#1e293b] border border-gray-700 focus:border-blue-500 outline-none"
        />

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-xl mb-10 border border-gray-700">
          <EnvrolmentAdd
            students={students}
            groups={groups}
            onAdd={handleAdd}
          />
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-xl border border-gray-700">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-600 text-gray-400 uppercase text-sm">
                <th className="py-3">Student</th>
                <th>Group</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((e) => {
                const student = studentMap[e.studentId];
                const group = groupMap[e.groupId];

                if (editingId === e.id) {
                  return (
                    <EnvrolmentEdit
                      key={e.id}
                      envrolment={e}
                      students={students}
                      groups={groups}
                      onUpdate={handleUpdate}
                      onCancel={() => setEditingId(null)}
                    />
                  );
                }

                return (
                  <tr
                    key={e.id}
                    className="border-b border-gray-700 hover:bg-gray-700/40 transition"
                  >
                    <td className="py-4">{student?.name || "Not found"}</td>
                    <td>{group?.nomi || "Not found"}</td>
                    <td className="flex gap-3 py-2">
                      <button
                        onClick={() => setEditingId(e.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl transition"
                      >
                        ✏ Edit
                      </button>

                      <EnvrolmentDelete id={e.id} onDelete={handleDelete} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Envrolment;
