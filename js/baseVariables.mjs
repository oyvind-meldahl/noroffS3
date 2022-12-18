export const baseURL = "https://api.noroff.dev/api/v1/auction/";
export const options = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
};
