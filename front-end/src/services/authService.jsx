import { serviceUtils } from "../utils/serviceUtils";

export const authService = {
  login,
  logout,
  signup
};

async function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password
    }),
    credentials: "include"
  };

  return fetch(`http://localhost:3000/api/auth/login`, requestOptions)
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .then(body => {
      // login successful if there's a user in the response
      if (body.data) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        body.data.type = body.data.employeeId
          ? "admin"
          : body.data.organizerOf && body.data.organizerOf.length > 0
          ? "organizer"
          : "student";
        localStorage.setItem("user", JSON.stringify(body.data));
      }
      return body;
    });
}

async function logout() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  };

  localStorage.removeItem("user");
  return fetch(`http://localhost:3000/api/auth/logout`, requestOptions).then(
    () => {
      window.location.reload(true);
    }
  );
}

function signup(email, password, firstName, lastName) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName
    })
  };

  return fetch(`http://localhost:3000/api/auth/signup`, requestOptions)
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .then(response => {
      return response;
    });
}
