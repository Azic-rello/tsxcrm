"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props {
  onAdd: (student: any) => void
}

const StudentAdd = ({ onAdd }: Props) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")
  const [group, setGroup] = useState("")

  const submit = () => {
    if (!firstName || !lastName || !age || !group) {
      alert("Hammasini to‘ldir")
      return
    }

    onAdd({
      firstName,
      lastName,
      age: Number(age),
      group,
    })

    setFirstName("")
    setLastName("")
    setAge("")
    setGroup("")
  }

  return (
    <div className="bg-gray-700 p-4 rounded-lg border border-gray-700">
      

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          placeholder="Ism"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Familya"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <Input  
          type="number"
          placeholder="Yosh"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
        <Input
          placeholder="Guruh (React, Vue...)"
          value={group}
          onChange={e => setGroup(e.target.value)}
        />
      </div>

      <Button
        onClick={submit}
        className="w-full mt-4"
      >
        Add Student
      </Button>
    </div>
  )
}

export default StudentAdd