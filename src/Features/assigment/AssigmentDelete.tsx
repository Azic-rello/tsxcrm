const AssignmentDelete = ({ id }) => {
  const handleDelete = async () => {
    
    await fetch(`http://localhost:5000/assignments/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
    >
      O`chirish
    </button>
  );
};

export default AssignmentDelete;
