import { serviceUtils } from "../utils/serviceUtils";

export const calendarService = {
  getCalendarRSVP
};

function getCalendarRSVP(userId, from, to) {
  return fetch(
    `http://localhost:3000/api/calendar/rsvp/${userId}&${from}&${to}`,
    serviceUtils.getRequestOptions
  )
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .catch(error => {
      console.log({ error });
    });
}
