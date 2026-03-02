import React from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, Layers } from "lucide-react";

export default function UltraPremiumWelcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-indigo-900 flex items-center justify-center p-6 overflow-hidden relative">

      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-indigo-400 opacity-30"
      >
        <Users size={64} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 15, 0] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute bottom-32 right-20 text-purple-400 opacity-30"
      >
        <GraduationCap size={64} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute top-1/2 right-10 text-indigo-500 opacity-30"
      >
        <Layers size={64} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-gradient-to-r from-indigo-700 to-purple-700 p-16 rounded-4xl shadow-2xl backdrop-blur-xl border border-white/20 max-w-3xl text-center overflow-hidden z-10"
      >
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
          CRM tizimiga xush kelibsiz
        
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed">
            Ta’lim tizimingizni to‘liq nazorat qiling. O‘qituvchilarni, 
          talabalarni va guruhlarni samarali boshqaring, 
          rivojlanishni kuzating, resurslarni tartibga soling 
          va ish unumdorligini oshiring.
        </p>
        {/* <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.35)" }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-white/20 hover:bg-white/30 transition rounded-2xl text-white font-semibold text-lg shadow-lg"
        >
          Boshlash
        </motion.button> */}
      </motion.div>
    </div>
  );
}