import axios from "axios";

export const config = {
  fetchUrl: "https://capcards-api.herokuapp.com/v1.0/api"
};

const callPlainApi = (url, data, method) => {
  let axiosOptions = {
    timeout: 15000
  }
  return new Promise(function(resolve, reject) {
    if (method === "PUT") {
      axios
        .put(`${config.fetchUrl}${url}`, data, {timeout: axiosOptions.timeout,})
        .then(response => {
          if(response){
            resolve(response.data);
          } else {
            resolve(response)
          }
        })
        .catch(err => {
          reject(err);
        });
    }
    if (method === "POST") {
      axios
        .post(`${config.fetchUrl}${url}`, data, {timeout: axiosOptions.timeout,})
        .then(response => {
          if(response){
            resolve(response.data);
          } else {
            resolve(response)
          }
        })
        .catch(err => {
          reject(err);
        });
    } else {
      axios
        .get(`${config.fetchUrl}${url}`, {timeout: axiosOptions.timeout})
        .then(response => {
          if(response){
            resolve(response.data);
          } else {
            resolve(response)
          }
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

const callSecuredApi = (url, data, method, token, callback) => {
  let axiosOptions = {
    timeout: 20000,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  };
  return new Promise(function(resolve, reject) {
    if (method === "PUT") {
      axiosOptions.method = "PUT";
      axiosOptions.body = data;
      axios
        .put(`${config.fetchUrl}${url}`, data, {
          timeout: axiosOptions.timeout,
          headers: axiosOptions.headers
        })
        .then(response => {
          if (callback) {
            callback();
          }
          if(response){
            resolve(response.data);
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          if (callback) {
            callback(error);
          }
          reject(error);
        });
    } else if (method === "POST") {
      axios
        .post(`${config.fetchUrl}${url}`, data, {
          timeout: axiosOptions.timeout,
          headers: axiosOptions.headers
        })
        .then(response => {
          if(response){
            resolve(response.data);
          } else {
            resolve(response)
          }
        })
        .catch(err => {
          if (err.response && err.response.data) {
            reject(err.response.data);
          }
          if (err.response && err.response.status) {
            reject(err.response.status);
          }
          reject(err);
        });
    } else if (method === "PATCH") {
      axios
        .patch(`${config.fetchUrl}${url}`, data, {
          timeout: axiosOptions.timeout,
          headers: axiosOptions.headers
        })
        .then(response => {
          if(response){
            resolve(response.data);
          } else {
            resolve(response)
          }
        })
        .catch(err => {
          if (err.response && err.response.data) {
            reject(err.response.data);
          }
          reject(err);
        });
    } else if (method === "DELETE") {
      axios
        .delete(`${config.fetchUrl}${url}`, {
          timeout: axiosOptions.timeout,
          headers: axiosOptions.headers
        })
        .then(response => {
          if(response){
            resolve(response.data);
          } else {
            resolve(response)
          }
        })
        .catch(err => {
          if (err.response.data) {
            reject(err.response.data);
          }
          reject(err.response.status);
        });
    } else {
      axios
        .get(`${config.fetchUrl}${url}`, {
          timeout: axiosOptions.timeout,
          headers: axiosOptions.headers
        })
        .then(response => {
          if(response){
            resolve(response.data);
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

export const callApi = (url, data, method, token, callback) => {
  if (token) {
    return callSecuredApi(url, data, method, token, callback);
  }
  return callPlainApi(url, data, method, callback);
};