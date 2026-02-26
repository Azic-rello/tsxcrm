import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@mui/material"
import axios from "axios"

interface Teacher {
  id: number
  firstName: string
  lastName: string
}

interface Props {
  open: boolean
  onClose: () => void
  reload: () => void
  teacher: Teacher
}

const API = "http://localhost:3001/Teacher"

const TeacherDelete = ({ open, onClose, reload, teacher }: Props) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/${teacher.id}`)
      reload()
      onClose()
    } catch (err) {
      console.error("O‘chirishda xatolik:", err)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#2a2a2a",
          color: "#eee",
          borderRadius: 3,
          p: 1
        }
      }}
    >
      <DialogTitle sx={{ fontSize: 20, fontWeight: 500 }}>
        O‘qituvchini o‘chirish
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ color: "#bbb" }}>
          Haqiqatdan ham{" "}
          <b style={{ color: "#fff" }}>
            {teacher.firstName} {teacher.lastName}
          </b>{" "}
          ni o‘chirmoqchimisiz?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{ color: "#aaa" }}
        >
          Bekor qilish
        </Button>

        <Button
          variant="contained"
          onClick={handleDelete}
          sx={{
            bgcolor: "#444",
            "&:hover": { bgcolor: "#666" }
          }}
        >
          O‘chirish
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TeacherDelete