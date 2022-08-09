import axios from "axios";

/**
 * Use cases:
 * - adding authentication tokens
 * - logging requests
 * - adding custom request headers needed for all requests
 */
axios.interceptors.request.use(function (config) {
    // console.log(config);
    // console.log('Request sent');
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

/**
 * Use cases:
 * - logging requests
 * - custom request transforms needed for the app
 * - handling errors (401, 403, 500)
 */
axios.interceptors.response.use(function (response) {
    // console.log(response);
    // console.log("Response received");
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
