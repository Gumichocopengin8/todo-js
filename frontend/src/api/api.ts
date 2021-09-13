import { axios, todolistsURL } from "./apiConfig";

export const fetchTodoListsUsingGET = async () => {
  return axios
    .get(`${todolistsURL}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const createTodoListUsingPOST = async (name: string) => {
  return axios
    .post(`${todolistsURL}`, { name })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const createTodoListItemUsingPOST = async (
  todolistId: string,
  name: string,
) => {
  return axios
    .post(`${todolistsURL}/${todolistId}/items`, { name })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const fetchTodoListItemsUsingGET = async (todolistId: string) => {
  return axios
    .get(`${todolistsURL}/${todolistId}/items`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const updateTodoListItemUsingPUT = async (
  todolistId: string,
  todolistItemId: string,
  isCompleted: boolean,
) => {
  return axios
    .put(`${todolistsURL}/${todolistId}/items/${todolistItemId}`, {
      isCompleted,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const deleteTodoListUsingDELETE = async (todolistId: string) => {
  return axios
    .delete(`${todolistsURL}/${todolistId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const deleteTodoListItemUsingDELETE = async (
  todolistId: string,
  todolistItemId: string,
) => {
  return axios
    .delete(`${todolistsURL}/${todolistId}/items/${todolistItemId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};
