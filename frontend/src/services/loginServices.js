import axios from "axios";
const baseURL = "http://localhost:5000";
export function login(data) {
  return axios.post(baseURL + "/auth/login", JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
export function logout() {
  return axios.get(baseURL + "/auth/logout", {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}
