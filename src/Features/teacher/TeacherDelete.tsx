"use client";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const API = "http://localhost:5000/Teacher";

export default function TeacherDelete({ teacher, onClose, reload }: any) {

  const handleDelete = async () => {
    await axios.delete(`${API}/${teacher.id}`);
    reload();
    onClose();
  }

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
            <DialogTitle className="text-2xl font-extrabold text-red-500 tracking-wide">
              Delete Teacher
            </DialogTitle>
          </DialogHeader>

          <div className="py-6 text-center">
            <p className="text-white/80 text-base mb-2">
              Are you sure you want to delete
            </p>
            <p className="text-red-300 font-semibold text-lg">
              {teacher?.firstName} {teacher?.lastName}?
            </p>
          </div>

          <DialogFooter className="flex justify-center gap-4">
           <Button
  className="px-8 py-2 rounded-lg
             bg-white text-slate-800
             hover:bg-gray-200
             font-medium
             transition-all duration-200"
  onClick={onClose}
>
  Cancel
</Button>
            <Button
              variant="destructive"
              className="px-8 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 transition-transform shadow-lg"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}