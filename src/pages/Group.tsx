import { useEffect, useState } from "react";
import axios from "axios";
import {GroupAdd, GroupDel, GroupEdit} from "../../";

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null);
  const [rooms, setRooms] = useState([]);

  const fetchGroups = () => {
    axios.get("http://localhost:5000/Group")
      .then(res => setGroups(res.data || []))
      .catch(err => console.error(err));
  };

  const fetchRooms = () => {
    axios.get("http://localhost:5000/Room")
      .then(res => setRooms(res.data || []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchGroups();
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("O'chirmoqchimisiz?")) return;
    try {
      await axios.delete(`http://localhost:5000/Group/${id}`);
      fetchGroups();
    } catch (err) {
      console.error(err);
      alert("O'chirishda xato");
    }
  };

  const handleUpdate = () => {
    setEditingGroup(null);
    fetchGroups();
  };

  return (
    <div className="min-h-screen bg-[#0a1929] text-white p-6 md:p-10">
      <h1 className="text-center text-4xl md:text-5xl font-bold mb-12">
        Group Panel
      </h1>

      <GroupAdd rooms={rooms} onAdd={fetchGroups} />

      {editingGroup && (
        <GroupEdit
          group={editingGroup}
          rooms={rooms}
          onUpdate={handleUpdate}
          onCancel={() => setEditingGroup(null)}
        />
      )}

      <GroupDel
        groups={groups}
        onEdit={setEditingGroup}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Group