"use client"

import { useEffect, useState } from "react"
import StudentAdd from "../Features/student/StudentAdd"
import StudentDelete from "../Features/student/StudentDelete"

const Student = () => {
  const [students, setStudents] = useState<any[]>([])

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then(res => res.json())
      .then(data => setStudents(data))
  }, [])

  const handleAdd = async (student: any) => {
    const tempId = Date.now()
    const tempStudent = { ...student, id: tempId }
    setStudents(prev => [tempStudent, ...prev])

    const res = await fetch("http://localhost:3000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })

    const saved = await res.json()
    setStudents(prev =>
      prev.map(s => (s.id === tempId ? saved : s))
    )
  }

  const handleDelete = async (id: number) => {
    setStudents(prev => prev.filter(s => s.id !== id))
    await fetch(`http://localhost:3000/students/${id}`, { method: "DELETE" })
  }

  return (
    <div className="min-h-screen flex justify-center py-10">
      <div className="w-full max-w-2xl rounded-xl shadow-lg p-6 ">
        
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Students
        </h2>

        <div className="mb-8">
          <StudentAdd onAdd={handleAdd} />
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {students.length === 0 && (
            <p className="text-center text-gray-500">
              Hali student qo‘shilmagan
            </p>
          )}

          {students.map(student => (
            <div
              key={student.id}
              className="
                relative
                border border-gray-300
                rounded-lg
                p-4
                bg-black
                hover:bg-gray-100
                transition
              "
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {student.age} yosh · {student.group}
                  </p>
                </div>
              </div>

              {/* DELETE */}
              <StudentDelete onDelete={() => handleDelete(student.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Student