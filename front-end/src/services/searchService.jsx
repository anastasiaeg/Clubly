import { serviceUtils } from "../utils/serviceUtils";

export const searchService = {
  searchClub,
  searchEvents
};

function searchClub(query) {
  return fetch(
    `http://localhost:3000/api/search/clubs?query=${query}`,
    serviceUtils.getRequestOptions
  )
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .catch(error => {
      console.log({ error: error });
    });
}

function searchEvents(query) {
  return fetch(
    `http://localhost:3000/api/search/events?query=${query}`,
    serviceUtils.getRequestOptions
  )
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .catch(error => {
      console.log({ error: error });
    });
}
