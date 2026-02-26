import { useEffect, useState } from "react";
import AssignmentAdd from "../Features/assigment/AssigmentAdd";
import AssignmentEdit from "../Features/assigment/AssigmentEdit";
import AssignmentDelete from "../Features/assigment/AssigmentDelete";

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/assignments")
      .then(res => res.json())
      .then(data => setAssignments(data));

    fetch("http://localhost:3000/teachers")
      .then(res => res.json())
      .then(data => setTeachers(data));

    fetch("http://localhost:3000/groups")
      .then(res => res.json())
      .then(data => setGroups(data));
  }, []);

  const getTeacherName = (id) => {
    return teachers.find(t => t.id === id)?.name || "Noma`lum";
  };

  const getGroupName = (id) => {
    return groups.find(g => g.id === id)?.name || "Noma`lum";
  };

  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 className="text-5xl text-blue-800 font-bold">
          O`qituvchilarni Guruhlarga Biriktirish
        </h1>
        <p className="text-gray-500 mt-3 text-xl">
          O`qituvchilarni guruhlarga biriktiring va nazorat qiling
        </p>
      </div>
      <AssignmentAdd
        teachers={teachers}
        groups={groups}
        onAdd={() => window.location.reload()}
      />
      <table className="w-full mt-10 border border-gray-700">
        <thead className="bg-black/50">
          <tr>
            <th className="p-3 border">O`qituvchi</th>
            <th className="p-3 border">Guruh</th>
            <th className="p-3 border">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id} className="text-center">
              <td className="p-3 border">
                {getTeacherName(a.teacherId)}
              </td>
              <td className="p-3 border">
                {getGroupName(a.groupId)}
              </td>
              <td className="p-3 border flex gap-3 justify-center">
                <AssignmentEdit
                  assignment={a}
                  teachers={teachers}
                  groups={groups}
                />
                <AssignmentDelete id={a.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignment;