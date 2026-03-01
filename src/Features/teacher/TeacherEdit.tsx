import { useEffect, useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  IconButton,
  Stack,
  Avatar,
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

const API = "http://localhost:5000/Teacher"

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
      await axios.put(`${API}/${teacher.id}`, { firstName, lastName, phone, subject })
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
          borderRadius: 5,
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.05)",
          border: "2px solid rgba(79,70,229,0.4)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.25)"
        }
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg,#2563eb,#4f46e5)",
          color: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          px: 3,
          py: 2
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
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      {/* FORM */}
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 2 }}>
        <TextField
          label="Ism"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              color: "white",
              "& fieldset": { borderColor: "rgba(79,70,229,0.3)" },
              "&:hover fieldset": { borderColor: "#2563eb" }
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" }
          }}
        />
        <TextField
          label="Familiya"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              color: "white",
              "& fieldset": { borderColor: "rgba(79,70,229,0.3)" },
              "&:hover fieldset": { borderColor: "#2563eb" }
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" }
          }}
        />
        <TextField
          label="Telefon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              color: "white",
              "& fieldset": { borderColor: "rgba(79,70,229,0.3)" },
              "&:hover fieldset": { borderColor: "#2563eb" }
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" }
          }}
        />
        <TextField
          label="Fan"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              color: "white",
              "& fieldset": { borderColor: "rgba(79,70,229,0.3)" },
              "&:hover fieldset": { borderColor: "#2563eb" }
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" }
          }}
        />
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions sx={{ px: 3, pb: 3, pt: 1.5, justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.2,
            color: "#4f46e5",
            borderColor: "#4f46e5",
            textTransform: "none",
            "&:hover": { backgroundColor: "rgba(79,70,229,0.05)" }
          }}
        >
          Bekor qilish
        </Button>

        <Button
          onClick={handleEdit}
          disabled={loading}
          variant="contained"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.2,
            fontWeight: 700,
            textTransform: "none",
            background: "linear-gradient(135deg,#2563eb,#4f46e5)",
            boxShadow: "0 10px 25px rgba(79,70,229,0.4)",
            "&:hover": { transform: "translateY(-2px)", boxShadow: "0 15px 35px rgba(79,70,229,0.6)" }
          }}
        >
          {loading ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TeacherEdit