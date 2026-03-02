"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const API = "http://localhost:5000/Teacher";

export default function TeacherEdit({ teacher, onClose, reload }: any) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    subject: ""
  });

  useEffect(() => {
    if (teacher) setForm(teacher);
  }, [teacher]);

  const handleEdit = async () => {
    await axios.put(`${API}/${teacher.id}`, form);
    reload();
    onClose();
  };

  if (!teacher) return null; 

  return (
    <Dialog open={!!teacher} onOpenChange={onClose}>
      <DialogContent className="p-0 bg-transparent shadow-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="bg-gradient-to-tr from-slate-800 via-indigo-900 to-slate-900 text-white rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl w-[420px] max-w-full mx-auto p-6"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-yellow-400 tracking-wide">
              Edit Teacher
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <Input
              placeholder="Ism"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="bg-white/10 placeholder-white/60 text-white border-white/20"
            />
            <Input
              placeholder="Familiya"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="bg-white/10 placeholder-white/60 text-white border-white/20"
            />
            <Input
              placeholder="Telefon"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-white/10 placeholder-white/60 text-white border-white/20"
            />
            <Input
              placeholder="Fan"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="bg-white/10 placeholder-white/60 text-white border-white/20"
            />
          </div>

          <DialogFooter className="flex justify-center mt-6 gap-4">
        <Button
  variant="outline"
  className="px-8 py-2 rounded-lg 
             bg-white text-slate-900 
             border-white 
             hover:bg-gray-100 
             transition-all duration-200 shadow-sm"
  onClick={onClose}
>
  Cancel
</Button>
            <Button
              variant="default"
              className="px-8 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 hover:scale-105 transition-transform shadow-lg"
              onClick={handleEdit}
            >
              Update
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}