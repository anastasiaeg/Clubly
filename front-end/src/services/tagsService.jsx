import { serviceUtils } from "../utils/serviceUtils";

export const tagsService = {
  getAllTags
};

function getAllTags() {
  return fetch(
    `http://localhost:3000/api/tags/`,
    serviceUtils.getRequestOptions
  )
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .catch(error => {
      console.log({ error: error });
    });
}
