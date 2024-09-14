import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/products";

export const fetchProducts = (page, size, productLine) => {
  return axios.get(`${API_BASE_URL}`, {
    params: {
      page,
      size,
      productLine,
    },
  });
};

export const createProduct = (data) => {
  return axios.post(API_BASE_URL, data);
};

export const updateProduct = (id, data) => {
  return axios.put(`${API_BASE_URL}/${id}`, data);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
