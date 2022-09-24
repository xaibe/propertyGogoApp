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

export const addNewAgencyApi = async (body) =>
  await axiosApi.post(urls.ADD_NEW_AGENCY, body).then((res) => res).catch((err) => err);

export const getAllAgenciesApi = async () =>
  await axiosApi.get(urls.GET_ALL_AGENCIES).then((res) => res).catch((err) => err);;

