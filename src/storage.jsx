export const getData = () => {
  const data = localStorage?.getItem("answers");
  return data ? JSON.parse(data) : [];
};

export const storeData = (data) => {
  localStorage.setItem("answers", JSON.stringify(data));
};
export const clearData = () => {
  localStorage.removeItem("answers");
};
