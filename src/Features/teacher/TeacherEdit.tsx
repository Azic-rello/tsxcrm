import React, { useState } from "react";

interface Group {
  id: number;
  name: string;
}

interface Envrolment {
  studentId: number;
  groupId: number;
}

interface Props {
  enrollment: Envrolment;
  groups: Group[];
  onEdit: (enrollment: Envrolment) => void;
}

const EnvrolomentEdit: React.FC<Props> = ({ enrollment, groups, onEdit }) => {
  const [groupId, setGroupId] = useState<number>(enrollment.groupId);

  return (
    <div>
      <h3>Edit Enrollment</h3>
      <select
        value={groupId}
        onChange={(e) => setGroupId(Number(e.target.value))}
      >
        {groups.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
      <button onClick={() => onEdit({ ...enrollment, groupId })}>Save</button>
    </div>
  );
};

export default EnvrolomentEdit;
