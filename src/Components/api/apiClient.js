import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/recipes/v2";

export const apiClient = axios.create({
  baseURL: API_BASE_URL
});
