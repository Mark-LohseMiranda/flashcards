import axios from "axios";
//local
const URL_PREFIX = "http://localhost:3001";
//deploy
// const URL_PREFIX = "https://mymoney-tracker-backend.herokuapp.com"

const API = {
  // ---------------- User Routes ---------------- //

  login: (usrData) => {
    return axios.post(`${URL_PREFIX}/api/users/login`, usrData, {
      withCredentials: true,
    });
  },

  logout: () => {
    return axios.get(`${URL_PREFIX}/api/users/logout`, {
      withCredentials: true,
    });
  },

  update: (data) => {
    return axios.put(`${URL_PREFIX}/api/users`, data, {
      withCredentials: true,
    });
  },

  signup: (data) => {
    return axios.post(`${URL_PREFIX}/api/users`, data);
  },

  delete: () => {
    return axios.delete(`${URL_PREFIX}/api/users`, { withCredentials: true });
  },

  // ---------------- Card Routes ---------------- //

  cardGroup: () => {
    return axios.get(`${URL_PREFIX}/api/cardgroup`, {
      withCredentials: true,
    });
  },

  createCardGroup: (data) => {
    return axios.post(`${URL_PREFIX}/api/cardgroup`, data, {
      withCredentials: true,
    });
  },

  updateCardGroup: (data, cardGroupId) => {
    return axios.put(`${URL_PREFIX}/api/cardgroup/${cardGroupId}`, data, {
      withCredentials: true,
    });
  },

  deleteCardGroup: (cardGroupId) => {
    return axios.delete(`${URL_PREFIX}/api/cardgroup/${cardGroupId}`, {
      withCredentials: true,
    });
  },
};

export default API;
