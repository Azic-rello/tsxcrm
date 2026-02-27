"use client"

import { Button } from "@/components/ui/button"

interface Props {
  onDelete: () => void
}

const StudentDelete = ({ onDelete }: Props) => {
  return (
    <Button
      variant="destructive"
      size="sm"
      style={{ position: "absolute", top: 8, right: 8 }}
      onClick={onDelete}
    >
      Delete
    </Button>
  )
}

export default StudentDelete