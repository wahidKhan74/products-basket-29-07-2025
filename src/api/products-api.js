import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseURl = 'http://localhost:3000';

// get all products
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get(`${baseURl}/products`);
  return res.data;
});

// add a new product
export const addProduct = createAsyncThunk('products/add', async (product) => {
  const res = await axios.post(`${baseURl}/products`, product);
  return res.data;
});

// get one product by id
export const fetchProductById = createAsyncThunk('products/fetchById', async (id) => {
  const res = await axios.get(`${baseURl}/products/${id}`);
  return res.data;
});

// delete a product by id
export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await axios.delete(`${baseURl}/products/${id}`);
  return id;
});

// update a product
export const updateProduct = createAsyncThunk('products/update', async ( product) => {
  const res = await axios.put(`${baseURl}/products/${product.id}`, product);
  return res.data;
});
