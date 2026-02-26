import React from "react";

interface Envrolment {
  studentId: number;
  groupId: number;
}

interface Props {
  enrollment: Envrolment;
  onDelete: (enrollment: Envrolment) => void;
}

const EnvrolomentDelete: React.FC<Props> = ({ enrollment, onDelete }) => {
  return (
    <div>
      <span>
        Student ID: {enrollment.studentId}, Group ID: {enrollment.groupId}
      </span>
      <button onClick={() => onDelete(enrollment)}>Delete</button>
    </div>
  );
};

export default EnvrolomentDelete;
