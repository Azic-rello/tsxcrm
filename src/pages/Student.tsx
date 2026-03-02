import { useEffect, useState } from "react"
import StudentAdd from "../Features/student/StudentAdd"
import StudentDelete from "../Features/student/StudentDelete"
import { Label } from "@/components/ui/label"

const Student = () => {
  const [students, setStudents] = useState<any[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/Student")
      .then(res => res.json())
      .then(data => setStudents(data))
  }, [])

  const handleAdd = async (student: any) => {
    const tempId = Date.now()
    const tempStudent = { ...student, id: tempId }
    setStudents(prev => [tempStudent, ...prev])

    const res = await fetch("http://localhost:5000/Student", {
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

    await fetch(`http://localhost:5000/Student/${id}`, {
      method: "DELETE",
    })
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-slate-900 py-12">
      <div className="w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-700 p-8 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-800">
        
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide">
          Students Directory
        </h2>

        <div className="mb-8">
          <StudentAdd onAdd={handleAdd} />
        </div>

        <div className="grid gap-6">
          {students.length === 0 && (
            <p className="text-center text-gray-400 italic">
              Hech narsa yo'q
            </p>
          )}

          {students.map(student => (
            <div
              key={student.id}
              className="
                relative
                flex flex-col justify-between
                border border-gray-700
                rounded-2xl
                p-6
                bg-gradient-to-r from-slate-800 via-gray-900 to-slate-900
                shadow-lg
                hover:scale-105 hover:shadow-2xl
                transition-transform duration-300
                text-white
              "
            >
              <div className="flex justify-between items-start">
                <div>
                  <Label className="text-lg font-semibold text-white">
                    {student.firstName} {student.lastName}
                  </Label>
                  <p className="text-sm text-gray-400 mt-1">
                    {student.age} yosh · {student.group}
                  </p>
                </div>

                <StudentDelete
                  onDelete={() => handleDelete(student.id)}
                  className="ml-4"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Student