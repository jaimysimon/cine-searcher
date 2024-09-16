import { BASE_URL } from "constants";

import axios from "axios";

const fetch = params => axios.get(BASE_URL, { params });

const show = params => axios.get(BASE_URL, { params });

const moviesApi = { fetch, show };

export default moviesApi;
