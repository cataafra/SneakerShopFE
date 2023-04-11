import axios from "axios";

const PROD_API_URL = "http://ec2-16-16-75-13.eu-north-1.compute.amazonaws.com/";
const LOCAL_API_URL = "http://127.0.0.1:8000/";
const NETLIFY_URL = "/";

const ApiService = (url) => {
  return {
    get(endpoint) {
      return axios.get(url + endpoint).then((response) => response.data);
    },

    post(endpoint, data) {
      return axios.post(url + endpoint, data).then((response) => response.data);
    },

    patch(endpoint, data) {
      return axios
        .patch(url + endpoint, data)
        .then((response) => response.data);
    },

    delete(endpoint) {
      return axios.delete(url + endpoint).then((response) => response.data);
    },
  };
};

export default ApiService(NETLIFY_URL);
