import axios from "axios";
import { t } from "i18next";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { Toastr } from "neetoui";
import { evolve } from "ramda";
import { OMDB_API_URL, OMDB_API_KEY } from "src/constants";

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const setDefaultParams = () => {
  axios.defaults.params = { apikey: OMDB_API_KEY };
};

const shouldShowToastr = response =>
  typeof response === "object" && response?.noticeCode;

const showSuccessToastr = response => {
  if (shouldShowToastr(response.data)) Toastr.success(response.data);

  return response;
};

const showErrorToastr = error => {
  if (error.message === t("error.networkError")) {
    Toastr.error(t("error.noInternetConnection"));
  } else if (error.response?.status !== 404) {
    Toastr.error(error);
  }

  return error;
};

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);

  return response;
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      transformResponseKeysToCamelCase(response);
      showSuccessToastr(response);

      return response.data;
    },
    error => {
      showErrorToastr(error);

      return Promise.reject(error);
    }
  );
};

const requestInterceptors = () => {
  axios.interceptors.request.use(
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );
};

const registerIntercepts = () => {
  requestInterceptors();
  responseInterceptors();
};

export default function initializeAxios() {
  axios.defaults.baseURL = OMDB_API_URL;
  setHttpHeaders();
  setDefaultParams();
  registerIntercepts();
}
