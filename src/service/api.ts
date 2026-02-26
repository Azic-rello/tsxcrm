import axios from "axios";

const API = "http://localhost:5000";

export const getStudents = () => axios.get(`${API}/students`);
export const getGroups = () => axios.get(`${API}/groups`);
export const getEnvrolments = () => axios.get(`${API}/enrolments`);

export const addEnvrolment = (data: { studentId: string; groupId: string }) =>
  axios.post(`${API}/enrolments`, data);

export const deleteEnvrolment = (id: string) =>
  axios.delete(`${API}/enrolments/${id}`);

export const updateEnvrolment = (
  id: string,
  data: { studentId: string; groupId: string },
) => axios.put(`${API}/enrolments/${id}`, data);
