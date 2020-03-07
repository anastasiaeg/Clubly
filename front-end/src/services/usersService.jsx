import { serviceUtils } from "../utils/serviceUtils";

export const usersService = {
  getUser,
  editUser
};

function getUser(id) {
  return fetch(
    `http://localhost:3000/api/users/${id}`,
    serviceUtils.getRequestOptions
  )
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .catch(error => {
      console.log({ error: error });
    });
}

async function editUser(user) {
  delete user.type;
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include"
  };

  return fetch(
    `http://localhost:3000/api/users/${user.id}`,
    requestOptions
  ).then(response => {
    return serviceUtils.handleResponse(response);
  });
}
