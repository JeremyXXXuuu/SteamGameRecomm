import axios from "axios";

const url = "/api/recom";
export const getAll = (page) => axios.get(`${url}?page=${page}`);

export const get = (id) => axios.get(`${url}/${id}`);

export const findByGameName = (name) => axios.get(`${url}?name=${name}`);

export const getGameDetails = (id) => axios.get(`${url}/details/${id}`);
