import { checkResponse, request } from "./Api";
const baseUrl = "http://localhost:3001";

function userSignUp({ name, avatar, email, password }) {
  return request(`signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
}

function userSignin({ email, password }) {
  return request(`signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

const getUserInfo = (token) => {
  return request(`users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

function userEdit({ name, avatar }, token) {
  return request(`users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
}

export { userSignUp, userSignin, getUserInfo, userEdit };
