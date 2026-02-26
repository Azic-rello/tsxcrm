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
      await axios.post(API, {
        firstName,
        lastName,
        phone,
        subject
      })

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
          backdropFilter: "blur(15px)",
          background:
            "linear-gradient(135deg,#ffffff,#f8fafc)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.25)"
        }
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          background:
            "linear-gradient(135deg,#2563eb,#4f46e5)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <PersonAddAlt1Icon />
          <Typography fontWeight={700}>
            Yangi O‘qituvchi
          </Typography>
        </Box>

        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* FORM */}
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 3
        }}
      >
        <TextField
          label="Ism"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon color="primary" />
              </InputAdornment>
            )
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
                <SchoolIcon color="primary" />
              </InputAdornment>
            )
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
                <PhoneIcon color="primary" />
              </InputAdornment>
            )
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
                <MenuBookIcon color="primary" />
              </InputAdornment>
            )
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 3,
            px: 3
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
            fontWeight: 700,
            background:
              "linear-gradient(135deg,#2563eb,#4f46e5)",
            boxShadow:
              "0 10px 25px rgba(79,70,229,0.4)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                "0 15px 35px rgba(79,70,229,0.6)"
            }
          }}
        >
          Qo‘shish
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TeacherAdd