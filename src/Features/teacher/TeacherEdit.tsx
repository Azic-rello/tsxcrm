import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Avatar,
  Stack
} from "@mui/material"

import EditRoundedIcon from "@mui/icons-material/EditRounded"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

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
  teacher?: Teacher
}

const API = "http://localhost:3011/Teacher"

const TeacherEdit = ({ open, onClose, reload, teacher }: Props) => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")
  const [loading, setLoading] = useState(false)

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
      setLoading(true)

      await axios.put(`${API}/${teacher.id}`, {
        firstName,
        lastName,
        phone,
        subject
      })

      reload()
      onClose()
    } finally {
      setLoading(false)
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
          borderRadius: 4,
          p: 1,
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
        }
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "#2563eb" }}>
            <EditRoundedIcon />
          </Avatar>

          <Typography variant="h6" fontWeight={700}>
            O‘qituvchini tahrirlash
          </Typography>
        </Stack>

        <IconButton onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>

        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 3,
            background: "#f8fafc"
          }}
        >
          <Typography fontWeight={600}>
            {teacher?.firstName} {teacher?.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ma’lumotlarni yangilang
          </Typography>
        </Box>

        <Stack spacing={2.5}>
          <TextField
            label="Ism"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Familiya"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />

          <TextField
            label="Fan"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            fullWidth
          />
        </Stack>

      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Bekor qilish
        </Button>

        <Button
          onClick={handleEdit}
          disabled={loading}
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 4,
            fontWeight: 600
          }}
        >
          {loading
            ? <CircularProgress size={22} color="inherit" />
            : "Saqlash"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TeacherEdit