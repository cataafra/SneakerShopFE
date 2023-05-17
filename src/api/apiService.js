import axios from "axios";
const PROD_API_URL =
  "https://ec2-16-170-29-78.eu-north-1.compute.amazonaws.com/";
const LOCAL_API_URL = "http://127.0.0.1:8000/";
const IP_URL = "http://16.170.29.78";
const AFRA_URL = "https://api.afrastudios.xyz/";

const ApiService = (url) => {
  return {
    get(endpoint) {
      const headers = {
        "Content-Type": "application/json",
      };

      const token = localStorage.getItem("token");

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      return axios
        .get(url + endpoint, { headers })
        .then((response) => response.data);
    },

    post(endpoint, data) {
      const headers = {
        "Content-Type": "application/json",
      };

      const token = localStorage.getItem("token");

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      return axios
        .post(url + endpoint, data, { headers })
        .then((response) => response.data);
    },

    patch(endpoint, data) {
      const headers = {
        "Content-Type": "application/json",
      };

      const token = localStorage.getItem("token");

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      return axios
        .patch(url + endpoint, data, { headers })
        .then((response) => response.data);
    },

    delete(endpoint) {
      const headers = {
        "Content-Type": "application/json",
      };

      const token = localStorage.getItem("token");

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      return axios
        .delete(url + endpoint, { headers })
        .then((response) => response.data);
    },
  };
};

export default ApiService(AFRA_URL);
