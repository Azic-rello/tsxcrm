import { api } from "@/service/api";

const ManagerDelete = ({ id, onSuccess }: { id: number; onSuccess: () => void }) => {
  const remove = async () => {
    if (!confirm("O‘chiramizmi?")) return;
    await api.delete(`/managers/${id}`);
    onSuccess();
  };

  return (
    <button
      onClick={remove}
      className="text-red-600 hover:underline ml-2"
    >
      Delete
    </button>
  );
};

export default ManagerDelete;