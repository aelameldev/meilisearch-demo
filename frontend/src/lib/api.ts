import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  paramsSerializer: {
    indexes: null
  }
})


api.interceptors.response.use(r => r?.data ? r.data : r);

export default api;