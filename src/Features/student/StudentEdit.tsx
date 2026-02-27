"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props {
  student: any
  refresh: () => void
}

const StudentEdit = ({ student, refresh }: Props) => {
  const [firstName, setFirstName] = useState(student.firstName)
  const [lastName, setLastName] = useState(student.lastName)
  const [age, setAge] = useState(student.age)
  const [group, setGroup] = useState(student.group)

  const save = async () => {
    await fetch(`http://localhost:3000/students/${student.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, age, group }),
    })
    refresh()
  }

  return (
    <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
      <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
      <Input value={lastName} onChange={e => setLastName(e.target.value)} />
      <Input type="number" value={age} onChange={e => setAge(e.target.value)} style={{ width: 70 }} />
      <Input value={group} onChange={e => setGroup(e.target.value)} />
      <Button size="sm" onClick={save}>Save</Button>
    </div>
  )
}

export default StudentEdit