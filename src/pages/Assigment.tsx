import { useEffect, useState } from "react";
import AssignmentAdd from "../Features/assigment/AssigmentAdd";
import AssignmentEdit from "../Features/assigment/AssigmentEdit";
import AssignmentDelete from "../Features/assigment/AssigmentDelete";

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [Teacher, setTeacher] = useState([]);
  const [groups, setGroups] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:5000/assignments")
      .then((res) => res.json())
      .then((data) => setAssignments(data));

    fetch("http://localhost:5000/Teacher")
      .then((res) => res.json())
      .then((data) => setTeacher(data));

    fetch("http://localhost:5000/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTeacherName = (teacherId) => {
    if (!teacherId) return "Not assigned";
    const teacher = Teacher.find(
      (t) => t.id.toString() === teacherId.toString(),
    );
    return teacher ? teacher.firstName : "Not found";
  };

  const getGroupName = (groupId) => {
    if (!groupId) return "Not assigned";
    const group = groups.find((g) => g.id.toString() === groupId.toString());
    return group ? group.nomi : "Not found";
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
        Teacher={Teacher}
        groups={groups}
        onAdd={fetchData}
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
              <td className="p-3 border">{getTeacherName(a.teacherId)}</td>
              <td className="p-3 border">{getGroupName(a.groupId)}</td>
              <td className="p-3 border flex gap-3 justify-center">
                <AssignmentEdit
                  assignment={a}
                  Teacher={Teacher}
                  groups={groups}
                  onUpdate={fetchData}
                />
                <AssignmentDelete id={a.id} onDelete={fetchData} />
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignment;
