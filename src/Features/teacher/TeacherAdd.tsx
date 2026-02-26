import { useState } from "react"
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
  InputAdornment
} from "@mui/material"

import CloseIcon from "@mui/icons-material/Close"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import PhoneIcon from "@mui/icons-material/Phone"
import SchoolIcon from "@mui/icons-material/School"
import BadgeIcon from "@mui/icons-material/Badge"
import MenuBookIcon from "@mui/icons-material/MenuBook"

import axios from "axios"

interface Props {
  open: boolean
  onClose: () => void
  reload: () => void
}

const API = "http://localhost:3011/Teacher"

const TeacherAdd = ({ open, onClose, reload }: Props) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")

  const handleAdd = async () => {
    if (!firstName || !lastName || !phone || !subject) return
    try {
      await axios.post(API, { firstName, lastName, phone, subject })
      reload()
      onClose()
      setFirstName("")
      setLastName("")
      setPhone("")
      setSubject("")
    } catch (err) {
      console.error(err)
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
          background: "linear-gradient(135deg,#2563eb,#4f46e5)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          px: 3,
          py: 2
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <PersonAddAlt1Icon />
          <Typography fontWeight={700} variant="h6">
            Yangi O‘qituvchi
          </Typography>
        </Box>

        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* FORM */}
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 2 }}>
        <TextField
          label="Ism"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon sx={{ color: "#6366f1" }} />
              </InputAdornment>
            )
          }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SchoolIcon sx={{ color: "#6366f1" }} />
              </InputAdornment>
            )
          }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon sx={{ color: "#6366f1" }} />
              </InputAdornment>
            )
          }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MenuBookIcon sx={{ color: "#6366f1" }} />
              </InputAdornment>
            )
          }}
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
          onClick={handleAdd}
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
          Qo‘shish
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TeacherAdd