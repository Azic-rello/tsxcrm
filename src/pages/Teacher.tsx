import { useEffect, useState } from "react"
import axios from "axios"
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  IconButton,
  Stack
} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import TeacherAdd from "../Features/teacher/TeacherAdd"
import TeacherEdit from "../Features/teacher/TeacherEdit"
import TeacherDelete from "../Features/teacher/TeacherDelete"

interface Teacher {
  id?: number
  firstName: string
  lastName: string
  phone: string
  subject: string
}

const API = "http://localhost:3011/Teacher"

const TeacherPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | null>(null)

  const loadData = async () => {
    const res = await axios.get<Teacher[]>(API)
    setTeachers(res.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const openAdd = () => setAddOpen(true)
  const openEdit = (teacher: Teacher) => {
    setCurrentTeacher(teacher)
    setEditOpen(true)
  }
  const openDelete = (teacher: Teacher) => {
    setCurrentTeacher(teacher)
    setDeleteOpen(true)
  }

  return (
    <Box sx={{ p: 4, bgcolor: "#1e1e1e", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ color: "#e0e0e0", mb: 3 }}>
        O‘qituvchilar ro‘yxati
      </Typography>

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={openAdd}
        sx={{
          mb: 3,
          color: "#e0e0e0",
          borderColor: "#555",
          "&:hover": { borderColor: "#888" }
        }}
      >
        O‘qituvchi qo‘shish
      </Button>

      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "#2a2a2a",
          borderRadius: 2,
          boxShadow: "none"
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#333" }}>
            <TableRow>
              {["Ism", "Familiya", "Telefon", "Fan", "Amallar"].map((head) => (
                <TableCell key={head} sx={{ color: "#bbb", fontWeight: 500 }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {teachers.map((t) => (
              <TableRow
                key={t.id}
                sx={{
                  "&:hover": { bgcolor: "#383838" }
                }}
              >
                <TableCell sx={{ color: "#ddd" }}>{t.firstName}</TableCell>
                <TableCell sx={{ color: "#ddd" }}>{t.lastName}</TableCell>
                <TableCell sx={{ color: "#ccc" }}>{t.phone}</TableCell>
                <TableCell sx={{ color: "#ccc" }}>{t.subject}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" sx={{ color: "#aaa" }} onClick={() => openEdit(t)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#888" }} onClick={() => openDelete(t)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {addOpen && <TeacherAdd open={addOpen} onClose={() => setAddOpen(false)} reload={loadData} />}
      {editOpen && currentTeacher && <TeacherEdit open={editOpen} onClose={() => setEditOpen(false)} teacher={currentTeacher} reload={loadData} />}
      {deleteOpen && currentTeacher && <TeacherDelete open={deleteOpen} onClose={() => setDeleteOpen(false)} teacher={currentTeacher} reload={loadData} />}
    </Box>
  )
}

export default TeacherPage