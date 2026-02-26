import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,

} from "@mui/material"
import axios from "axios"

interface Props {
  open: boolean
  onClose: () => void
  reload: () => void
}

const API = "http://localhost:3001/Teacher"

const TeacherAdd = ({ open, onClose, reload }: Props) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")

  const handleAdd = async () => {
    await axios.post(API, { firstName, lastName, phone, subject })
    reload()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#2a2a2a",
          color: "#eee",
          borderRadius: 3,
          p: 2
        }
      }}
    >
      <DialogTitle sx={{ fontSize: 22, fontWeight: 500 }}>
        O‘qituvchi qo‘shish
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 1
        }}
      >
        <TextField
          label="Ism"
          variant="outlined"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          InputLabelProps={{ style: { color: "#aaa" } }}
          sx={{
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#888" }
            }
          }}
        />

        <TextField
          label="Familiya"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          InputLabelProps={{ style: { color: "#aaa" } }}
          sx={{
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#888" }
            }
          }}
        />

        <TextField
          label="Telefon"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          InputLabelProps={{ style: { color: "#aaa" } }}
          sx={{
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#888" }
            }
          }}
        />

        <TextField
          label="Fan"
          fullWidth
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          InputLabelProps={{ style: { color: "#aaa" } }}
          sx={{
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#888" }
            }
          }}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{ color: "#aaa" }}
        >
          Bekor qilish
        </Button>

        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            bgcolor: "#444",
            px: 4,
            "&:hover": { bgcolor: "#666" }
          }}
        >
          Qo‘shish
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TeacherAdd