import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Avatar
} from "@mui/material"

import WarningRoundedIcon from "@mui/icons-material/WarningRounded"
import CloseIcon from "@mui/icons-material/Close"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

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
  teacher?: Teacher
}

const API = "http://localhost:5000/Teacher"

const TeacherDelete = ({ open, onClose, reload, teacher }: Props) => {

  const handleDelete = async () => {
    if (!teacher) return

    try {
      await axios.delete(`${API}/${teacher.id}`)
      reload()
      onClose()
    } catch (err) {
      console.error(err)
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
          borderRadius: 5,
          background:
            "linear-gradient(135deg,#ffffff,#fff5f5)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.25)"
        }
      }}
    >
      <DialogTitle
        sx={{
          background:
            "linear-gradient(135deg,#ef4444,#dc2626)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <WarningRoundedIcon />
          <Typography fontWeight={700}>
            O‘qituvchini o‘chirish
          </Typography>
        </Box>

        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center", mt: 3 }}>

        <Avatar
          sx={{
            bgcolor: "#fee2e2",
            color: "#dc2626",
            width: 70,
            height: 70,
            margin: "0 auto",
            mb: 2
          }}
        >
          <DeleteForeverIcon fontSize="large" />
        </Avatar>

        <Typography variant="h6" fontWeight={600}>
          Rostdan ham o‘chirmoqchimisiz?
        </Typography>

        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 3,
            background: "#fff",
            boxShadow: "0 5px 20px rgba(0,0,0,0.08)"
          }}
        >
          <Typography fontWeight={700}>
            {teacher?.firstName} {teacher?.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Teacher ma’lumoti butunlay o‘chiriladi
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "#dc2626",
            mt: 2,
            fontWeight: 500
          }}
        >
          Bu amalni ortga qaytarib bo‘lmaydi
        </Typography>

      </DialogContent>

     
      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          justifyContent: "center",
          gap: 2
        }}
      >
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
          onClick={handleDelete}
          variant="contained"
          startIcon={<DeleteForeverIcon />}
          sx={{
            borderRadius: 3,
            px: 4,
            fontWeight: 700,
            background:
              "linear-gradient(135deg,#ef4444,#dc2626)",
            boxShadow:
              "0 10px 25px rgba(220,38,38,0.4)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                "0 15px 35px rgba(220,38,38,0.6)"
            }
          }}
        >
          O‘chirish
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TeacherDelete