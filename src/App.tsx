import { Route, Routes } from "react-router-dom";
import { Admin, Group, Login, Manager, Room, Student, Teacher } from "../";
import { SiteBar } from "./components/shared/SiteBar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/admin" element={<SiteBar />}>
        <Route index element={<Admin />} />
        <Route path="/admin/student" element={<Student />} />
        <Route path="/admin/teacher" element={<Teacher />} />
        <Route path="/admin/group" element={<Group />} />
        <Route path="/admin/room" element={<Room />} />
        <Route path="/admin/manager" element={<Manager />} />
      </Route>
    </Routes>
  );
}

export default App;
