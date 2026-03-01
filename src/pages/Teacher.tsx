import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Typography,
  IconButton,
  Avatar,
  Stack,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"

import AddRoundedIcon from "@mui/icons-material/AddRounded"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"

import axios from "axios"

import TeacherAdd from "../Features/teacher/TeacherAdd"
import TeacherEdit from "../Features/teacher/TeacherEdit"
import TeacherDelete from "../Features/teacher/TeacherDelete"

interface Teacher {
  id: number
  firstName: string
  lastName: string
  phone: string
  subject: string
}

const API = "http://localhost:5000/Teacher"

export default function TeacherPage() {

  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [selectedTeacher, setSelectedTeacher] =
    useState<Teacher | null>(null)

  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const fetchTeachers = async () => {
    const res = await axios.get(API)

    const sorted = res.data.sort(
      (a: Teacher, b: Teacher) => b.id - a.id
    )

    setTeachers(sorted)
  }

  useEffect(() => {
    fetchTeachers()
  }, [])




  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 5,
        background:
          "radial-gradient(circle at top,#0f172a,#020617)",
        color: "white"
      }}
    >

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={5}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "#4f46e5",
              width: 56,
              height: 56
            }}
          >
            <SchoolRoundedIcon />
          </Avatar>

          <Box>
            <Typography fontSize={26} fontWeight={700}>
              Teachers Dashboard
            </Typography>

            <Typography color="gray">
              Total teachers — {teachers.length}
            </Typography>
          </Box>
        </Stack>

        <Button
          startIcon={<AddRoundedIcon />}
          onClick={() => setShowAdd(true)}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            color: "white",
            background:
              "linear-gradient(135deg,#6366f1,#8b5cf6)",
            boxShadow:
              "0 0 25px rgba(99,102,241,.6)",
            "&:hover": {
              transform: "translateY(-3px)"
            }
          }}
        >
          Add Teacher
        </Button>
      </Stack>

      <Paper
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <TableContainer>
          <Table>

            <TableHead>
              <TableRow
                sx={{
                  background:
                    "rgba(99,102,241,.15)"
                }}
              >
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell sx={{ color: "white" }}>Teacher</TableCell>
                <TableCell sx={{ color: "white" }}>Phone</TableCell>
                <TableCell sx={{ color: "white" }}>Subject</TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {teachers.map((teacher, index) => (

                <TableRow
                  key={teacher.id}
                  hover
                  sx={{
                    transition: ".25s",
                    "&:hover": {
                      background:
                        "rgba(255,255,255,0.06)"
                    }
                  }}
                >
                  <TableCell sx={{ color: "white" }}>
                    {index + 1}
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: "#6366f1" }}>
                        {teacher.firstName[0]}
                      </Avatar>

                      <Typography color="white" fontWeight={600}>
                        {teacher.firstName} {teacher.lastName}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell sx={{ color: "#cbd5f5" }}>
                    {teacher.phone}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={teacher.subject}
                      sx={{
                        bgcolor: "rgba(99,102,241,.2)",
                        color: "#a5b4fc"
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">

                    <IconButton
                      onClick={() => {
                        setSelectedTeacher(teacher)
                        setShowEdit(true)
                      }}
                    >
                      <EditRoundedIcon sx={{ color: "#60a5fa" }} />
                    </IconButton>

                    <IconButton
                      onClick={() => {
                        setSelectedTeacher(teacher)
                        setShowDelete(true)
                      }}
                    >
                      <DeleteRoundedIcon sx={{ color: "#f87171" }} />
                    </IconButton>

                  </TableCell>

                </TableRow>
              ))}

            </TableBody>

          </Table>
        </TableContainer>
      </Paper>

      <TeacherAdd
        open={showAdd}
        onClose={() => setShowAdd(false)}
        reload={fetchTeachers}
      />

      {selectedTeacher && (
        <>
          <TeacherEdit
            open={showEdit}
            teacher={selectedTeacher}
            onClose={() => setShowEdit(false)}
            reload={fetchTeachers}
          />

          <TeacherDelete
            open={showDelete}
            teacher={selectedTeacher}
            onClose={() => setShowDelete(false)}
            reload={fetchTeachers}
          />
        </>
      )}

    </Box>
  )
}
