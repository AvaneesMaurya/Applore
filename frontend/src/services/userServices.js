import axios from "axios";
const baseURL = "http://localhost:5000";
export function getAllUser() {
  return axios.get(baseURL + "/user/get", {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export function updateUser(data) {
  return axios.put(baseURL + `/user/update/${data._id}`, JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}
export function deleteUser(data) {
  return axios.delete(baseURL + `/user/delete/${data}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}
export function addUser(data) {
  return axios.post(baseURL + `/user/create`, JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}
