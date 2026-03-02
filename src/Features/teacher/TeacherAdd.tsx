"use client";
import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const API = "http://localhost:5000/Teacher";

interface Props {
  open: boolean;
  onClose: () => void;
  reload: () => Promise<void>;
}

export default function TeacherAdd({ open, onClose, reload }: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    subject: "",
  });

  const handleAdd = async () => {
    if (!form.firstName || !form.lastName) return;

    try {
      await axios.post(API, form);

      await reload(); // 🔥 MUHIM
      onClose();

      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        subject: "",
      });
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) onClose();
      }}
    >
      <DialogContent className="p-0 bg-transparent shadow-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="bg-gradient-to-tr from-slate-800 via-indigo-900 to-slate-900 text-white rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl w-[420px] max-w-full mx-auto p-6"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-blue-400 tracking-wide">
              Add Teacher
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <Input
              placeholder="Ism"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              className="bg-white/10 text-white border-white/20"
            />
            <Input
              placeholder="Familiya"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
              className="bg-white/10 text-white border-white/20"
            />
            <Input
              placeholder="Telefon"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="bg-white/10 text-white border-white/20"
            />
            <Input
              placeholder="Fan"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              className="bg-white/10 text-white border-white/20"
            />
          </div>

          <DialogFooter className="flex justify-center mt-6 gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-8 py-2"
            >
              Cancel
            </Button>

            <Button
              onClick={handleAdd}
              className="px-8 py-2 bg-gradient-to-r from-blue-500 to-indigo-600"
            >
              Save
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}