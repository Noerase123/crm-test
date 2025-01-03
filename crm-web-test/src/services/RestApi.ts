import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getCustomers = async (params?: any) => {
  return await axios.get(BASE_URL + '/customers', { params });
}

export const getSingleCustomer = async <T>(id: string) => {
  return await axios.get<T>(BASE_URL + '/customers/' + id);
}

export const createCustomer = async (payload: any) => {
  return await axios.post(BASE_URL + '/customers', payload, { headers: {} });
}

export const updateCustomer = async (id: string, payload: any) => {
  return await axios.patch(BASE_URL + '/customers/' + id, payload, { headers: {} });
}

export const deleteCustomer = async (id: string) => {
  return await axios.delete(BASE_URL + '/customers/' + id);
}