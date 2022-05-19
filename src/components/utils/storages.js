export const setToLocalStorage = (key, data) => {
  window.localStorage.setItem(key, data);
};
export const getFromLocalStorage = (key) => {
  window.localStorage.getItem(key);
};
