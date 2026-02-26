import { useEffect, useState } from "react";
import EnvrolomentAdd from "../Features/envrolment/EnvrolmentAdd";
import EnvrolomentEdit from "../Features/envrolment/EnvrolmentEdit";
import EnvrolomentDelete from "../Features/envrolment/EnvrolmentDelete";

interface Student {
  id: number;
  name: string;
}

interface Group {
  id: number;
  name: string;
}

interface Envrolment {
  studentId: number;
  groupId: number;
}

const Envroloment: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [enrollments, setEnrollments] = useState<Envrolment[]>([]);

  useEffect(() => {
    // db.json dan ma'lumot olish (mock)
    const fetchData = async () => {
      const data = await fetch("/db.json").then((res) => res.json());
      setStudents(data.Student);
      setGroups(data.groups);
      setEnrollments(data.Envrolment);
    };
    fetchData();
  }, []);

  const handleAdd = (enrollment: Envrolment) => {
    setEnrollments((prev) => [...prev, enrollment]);
  };

  const handleEdit = (enrollment: Envrolment) => {
    setEnrollments((prev) =>
      prev.map((e) => (e.studentId === enrollment.studentId ? enrollment : e)),
    );
  };

  const handleDelete = (enrollment: Envrolment) => {
    setEnrollments((prev) =>
      prev.filter(
        (e) =>
          !(
            e.studentId === enrollment.studentId &&
            e.groupId === enrollment.groupId
          ),
      ),
    );
  };

  return (
    <div>
      <h1>Student Group Enrollment</h1>
      <EnvrolomentAdd students={students} groups={groups} onAdd={handleAdd} />

      <h2>Edit Enrollments</h2>
      {enrollments.map((e, idx) => (
        <EnvrolomentEdit
          key={idx}
          enrollment={e}
          groups={groups}
          onEdit={handleEdit}
        />
      ))}

      <h2>Delete Enrollments</h2>
      {enrollments.map((e, idx) => (
        <EnvrolomentDelete key={idx} enrollment={e} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Envroloment;
