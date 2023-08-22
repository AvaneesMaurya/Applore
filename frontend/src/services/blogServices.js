import axios from "axios";
const baseURL = "http://localhost:5000";
export function getAllBlogsForHome() {
  return axios.get(baseURL + "/blogs/getAllBlogsForHome", {
    headers: {
      "content-type": "application/json",
    },
  });
}
export function getBlogAsPerUser() {
  return axios.get(baseURL + "/blogs/getBlogAsPerUser", {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}
export function createBlog(data) {
  return axios.post(baseURL + "/blogs/create", JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}
export function getPendingBlogs() {
  return axios.get(baseURL + "/blogs/getPendingBlogs", {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}
export function updateBlogs(data) {
  return axios.put(
    baseURL + `/blogs/update/${data._id}`,
    JSON.stringify(data),
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }
  );
}
export function deletedBlogs(data) {
  return axios.delete(baseURL + `/blogs/delete/${data}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}
export function approveBlogs(data) {
  return axios.put(baseURL + `/blogs/approvedBlog/${data}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}
