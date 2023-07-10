import axios from 'axios';

// const API_BASE_URL = "http://localhost:8080/recipes/v2";
const API_BASE_URL = "http://recipeapi-env.eba-z2c4wpxm.eu-west-1.elasticbeanstalk.com/recipes/v2"

export const apiClient = axios.create({
  baseURL: API_BASE_URL
});
