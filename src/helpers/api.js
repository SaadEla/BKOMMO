import axios from 'axios';
import API_URL from "../config/api/API_URL";
export default axios.create({
  baseURL: API_URL.SERVER_BASE_URL
});