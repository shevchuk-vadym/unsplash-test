export const setToLocalStorage = async (key, data) => {
  window.localStorage.setItem(key, data);
};
export const getFromLocalStorage = async (key) => {
  window.localStorage.getItem(key);
};
