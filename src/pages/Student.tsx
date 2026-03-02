import { useEffect, useState } from "react"
import StudentAdd from "../Features/student/StudentAdd"
import StudentDelete from "../Features/student/StudentDelete"
import { Label } from "@/components/ui/label"

const Student = () => {
  const [students, setStudents] = useState<any[]>([])

  useEffect(() => {
    fetch("http://localhost:3000/Student")
      .then(res => res.json())
      .then(data => setStudents(data))
  }, [])

  const handleAdd = async (student: any) => {
    const tempId = Date.now()
    const tempStudent = { ...student, id: tempId }
    setStudents(prev => [tempStudent, ...prev])

    const res = await fetch("http://localhost:3000/Student", {
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

    await fetch(`http://localhost:3000/Student/${id}`, {
      method: "DELETE",
    })
  }

  return (
    <div className="min-h-screen flex justify-center py-10">
      <div className="w-full max-w-2xl rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Students
        </h2>

        <div className="mb-8">
          <StudentAdd onAdd={handleAdd} />
        </div>

        <div className="space-y-4">
          {students.length === 0 && (
            <p className="text-center text-gray-400">
              Hech narsa yo'q
            </p>
          )}

          {students.map(student => (
            <div
              key={student.id}
              className="
                relative
                border
                border-gray-300
                rounded-lg
                p-4
                bg-black
                text-white
                hover:bg-gray-700
              "
            >
              <div className="flex justify-between items-start">
                <div>
                  <Label>
                    {student.firstName} {student.lastName}
                  </Label>
                  <p className="text-sm text-gray-400">
                    {student.age} yosh · {student.group}
                  </p>
                </div>
              </div>

              <StudentDelete
                onDelete={() => handleDelete(student.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Student