interface EnvrolmentDeleteProps {
  id: string;
  onDelete: (id: string) => void;
}

const EnvrolmentDelete = ({ id, onDelete }: EnvrolmentDeleteProps) => {
  return (
    <button
      onClick={() => onDelete(id)}
      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
    >
      Delete
    </button>
  );
};

export default EnvrolmentDelete;
