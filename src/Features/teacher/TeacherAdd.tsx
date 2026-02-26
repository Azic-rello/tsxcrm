import React, { useState } from "react";

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

interface Props {
  students: Student[];
  groups: Group[];
  onAdd: (enrollment: Envrolment) => void;
}

const EnvrolomentAdd: React.FC<Props> = ({ students, groups, onAdd }) => {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  return (
    <div>
      <h2>Add Student to Group</h2>
      <select
        onChange={(e) => setSelectedStudent(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>
          Select Student
        </option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setSelectedGroup(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>
          Select Group
        </option>
        {groups.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          if (selectedStudent !== null && selectedGroup !== null) {
            onAdd({ studentId: selectedStudent, groupId: selectedGroup });
          }
        }}
      >
        Add
      </button>
    </div>
  );
};

export default EnvrolomentAdd;
