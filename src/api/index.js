/* eslint-disable no-return-await */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import * as urls from './urls';

const axiosApi = axios.create({});
// eslint-disable-next-line prettier/prettier

axiosApi.defaults.baseURL = urls.SERVER_URL;
axiosApi.defaults.timeout = 120000;
axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Access-Control-Allow-Credentials'] = true;
    }
    config.credentials = 'same-origin';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosApi.interceptors.response.use(
  (res) => {
   return res;
  },
  (err) => {
    if (err?.response?.status === 403) {
      localStorage.removeItem('token');
      // window.location.href = '/login';
    }

    if (err?.response?.status === 401) {
      if (!(err?.response?.data?.errCode === 'TOKEN_EXPIRED')) {
      //   window.location.href = `${window.location.href}/401`;
      }
    }

    throw err;
  }
);

export const loginApi = async (email, password) =>
  await axiosApi.post(urls.LOGIN, { email, password }).then((res) => res).catch((err) => err);;

export const registerApi = async (email, password) =>
  await axiosApi.post(urls.REGISTER, {}, { email, password }).then((res) => res).catch((err) => err);;

export const addNewAgencyApi = async (body, name) =>

  await axiosApi.post(urls.ADD_NEW_AGENCY+name, body).then((res) => res).catch((err) => err);

export const getAllAgenciesApi = async () =>
  await axiosApi.get(urls.GET_ALL_AGENCIES).then((res) => res).catch((err) => err);

  export const deleteAllAgenciesApi = async (id) =>
  await axiosApi.delete(urls.DELETE_ALL_AGENCIES+id).then((res) => res).catch((err) => err);
 
  export const updateAllAgenciesApi = async (body, id) =>
  await axiosApi.patch(urls.UPDATE_ALL_AGENCIES+id, body).then((res) => res).catch((err) => err);

export const addNewUser = async (body, agencyId) =>
  await axiosApi.post(urls.ADD_NEW_USER+agencyId , body).then((res) => res).catch((err) => err);

  export const getAllUsers = async () =>
  await axiosApi.get(urls.GET_ALL_USER).then((res) => res).catch((err) => err);

  export const deleteAllUsers = async (id) =>
  await axiosApi.delete(urls.DELETE_ALL_USER+id).then((res) => res).catch((err) => err);
 
  export const updateAllUsers = async (body, id) =>
  await axiosApi.patch(urls.UPDATE_ALL_USER+id, body).then((res) => res).catch((err) => err);
  
  export const setPassword = async (body, hash, email) =>
  await axiosApi.post(urls.SET_PASSWORD+hash+email, body).then((res) => res).catch((err) => err);
  
  export const addAddressApi = async (body,id) =>
  await axiosApi.post(urls.SET_ADDRESS+id, body).then((res) => res).catch((err) => err);

  export const updateProfileAddressApi = async (body,id) =>
  await axiosApi.patch(urls.UPDATE_PROFILE_ADDRESS+id, body).then((res) => res).catch((err) => err);
  export const uploadImages = async (body) =>
  await axiosApi.post(urls.UPLOAD_IMAGES, body).then((res) => res).catch((err) => err);

