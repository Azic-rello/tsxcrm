"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import TeacherAdd from "../Features/teacher/TeacherAdd";
import TeacherEdit from "../Features/teacher/TeacherEdit";
import TeacherDelete from "../Features/teacher/TeacherDelete";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Pencil, Trash2, Plus } from "lucide-react";

const API = "http://localhost:5000/Teacher";

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  subject: string;
}

export default function TeacherPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [deleteTeacher, setDeleteTeacher] = useState<Teacher | null>(null);

  const fetchTeachers = async () => {
    const res = await axios.get(API);
    setTeachers(res.data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const filtered = teachers.filter((t) =>
    `${t.firstName} ${t.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-8 text-white">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent"
        >
          Teacher Management
        </motion.h1>

        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search teacher..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              className="pl-9 bg-white/10 border-white/20 backdrop-blur-md"
            />
          </div>
          <Button
            onClick={() => setOpenAdd(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transition"
          >
            <Plus size={16} /> Add Teacher
          </Button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/10">
            <tr className="text-left">
              <th className="p-4">Teacher</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Phone</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <motion.tr
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-t border-white/10 hover:bg-white/10 transition"
              >
                <td className="p-4 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {t.firstName[0]}
                      {t.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span>
                    {t.firstName} {t.lastName}
                  </span>
                </td>
                <td className="p-4 text-indigo-300">{t.subject}</td>
                <td className="p-4">{t.phone}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => setEditTeacher(t)}
                    >
                      <Pencil size={14} /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex items-center gap-1"
                      onClick={() => setDeleteTeacher(t)}
                    >
                      <Trash2 size={14} /> Delete
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {openAdd && (
        <TeacherAdd
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          reload={fetchTeachers}
        />
      )}
      {editTeacher && (
        <TeacherEdit
          teacher={editTeacher}
          onClose={() => setEditTeacher(null)}
          reload={fetchTeachers}
        />
      )}
      {deleteTeacher && (
        <TeacherDelete
          teacher={deleteTeacher}
          onClose={() => setDeleteTeacher(null)}
          reload={fetchTeachers}
        />
      )}
    </div>
  );
}