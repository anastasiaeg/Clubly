import { authService } from "../services/authService";

const getRequestOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  credentials: "include"
};

function handleResponse(response) {
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      authService.logout();
      window.location.reload(true);
    }
    return null;
  }
  return response.json();
}

export const serviceUtils = {
  handleResponse,
  getRequestOptions
};
