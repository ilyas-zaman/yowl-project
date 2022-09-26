import axios from "axios";

async function getCommentByPostId(id) {
  return axios.get(`http://localhost:8000/comments/post/${id}`);
}

async function getComments() {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgsImlhdCI6MTYzODk3NzQ3OSwiZXhwIjoxNjM4OTgxMDc5fQ.GRo45jzHEy2jLuZcffk-_o4QN-KkGrDWkgQetZH2fio";
  return axios.get("http://localhost:8000/comments", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export { getCommentByPostId };
export { getComments };
