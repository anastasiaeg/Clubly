import { serviceUtils } from "../utils/serviceUtils";

export const intermediateService = {
  editTagsUsers
};

function editTagsUsers(userId, tags) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tags),
    credentials: "include"
  };

  return fetch(`http://localhost:3000/api/tagsUsers/${userId}`, requestOptions)
    .then(response => {
      return serviceUtils.handleResponse(response);
    })
    .catch(error => {
      console.log({ error: error });
    });
}
