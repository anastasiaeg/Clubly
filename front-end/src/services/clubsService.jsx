import { serviceUtils } from "../utils/serviceUtils";

export const clubsService = {
  getClub,
  editClub,
  addClub
};

function getClub(id) {
  return fetch(
    `http://localhost:3000/api/clubs/${id}`,
    serviceUtils.getRequestOptions
  )
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .catch(error => {
      console.log({ error: error });
    });
}

function editClub(clubForm) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clubForm),
    credentials: "include"
  };
  return fetch(`http://localhost:3000/api/clubs/${clubForm.id}`, requestOptions)
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .catch(error => {
      console.log({ error: error });
    });
}

function addClub(clubForm) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clubForm),
    credentials: "include"
  };
  return fetch(`http://localhost:3000/api/clubs/`, requestOptions)
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .catch(error => {
      console.log({ error: error });
    });
}
