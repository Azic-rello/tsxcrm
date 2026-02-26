import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography
} from "@mui/material"
import axios from "axios"

interface Teacher {
  id: number
  firstName: string
  lastName: string
  phone: string
  subject: string
}

interface Props {
  open: boolean
  onClose: () => void
  reload: () => void
  teacher: Teacher | null
}

const API = "http://localhost:3011/Teacher"

const TeacherEdit = ({ open, onClose, reload, teacher }: Props) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")

  useEffect(() => {
    if (teacher) {
      setFirstName(teacher.firstName)
      setLastName(teacher.lastName)
      setPhone(teacher.phone)
      setSubject(teacher.subject)
    }
  }, [teacher])

  const handleEdit = async () => {
    if (!teacher) return
    try {
      await axios.put(`${API}/${teacher.id}`, {
        firstName,
        lastName,
        phone,
        subject
      })
      reload()
      onClose()
    } catch (err) {
      console.error("Tahrirlashda xatolik:", err)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="600">
          O‘qituvchini tahrirlash
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Ism"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Familiya"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Fan"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
        >
          Bekor qilish
        </Button>

        <Button
          onClick={handleEdit}
          variant="contained"
          size="small"
          sx={{
            textTransform: "none",
            borderRadius: 2
          }}
        >
          Saqlash
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TeacherEdit