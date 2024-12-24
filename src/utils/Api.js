import { json } from "react-router-dom";
import { getToken } from "./token";

const baseUrl = "http://localhost:3001";

function request(url, options) {
  return fetch(`${baseUrl}/${url}`, options).then(checkResponse);
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return request(`items`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/* before improvement */
/* function addClothes({ name, weather, imageUrl }) {
  const token = getToken();
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(checkResponse);
} */

function addClothes({ name, weather, imageUrl }) {
  const token = getToken();
  return request(`items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  });
}

function deleteClothes(_id) {
  const token = getToken();
  return request(`items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function addCardLike(_id, token) {
  return request(`items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function removeCardLike(_id, token) {
  return request(`items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export {
  getItems,
  addClothes,
  deleteClothes,
  addCardLike,
  removeCardLike,
  checkResponse,
  request,
};
