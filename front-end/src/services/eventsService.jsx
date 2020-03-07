import { serviceUtils } from "../utils/serviceUtils";

export const eventsService = {
  getEvent,
  editEvent,
  addEvent
};

function getEvent(id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  };
  return fetch(`http://localhost:3000/api/events/${id}`, requestOptions)
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .catch(error => {
      console.log({ error: error });
    });
}

function editEvent(eventForm) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventForm),
    credentials: "include"
  };
  return fetch(
    `http://localhost:3000/api/events/${eventForm.id}`,
    requestOptions
  )
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .catch(error => {
      console.log({ error: error });
    });
}

function addEvent(eventForm, clubId) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventForm),
    credentials: "include"
  };
  return fetch(
    `http://localhost:3000/api/events/byclub/${clubId}`,
    requestOptions
  )
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .catch(error => {
      console.log({ error: error });
    });
}
