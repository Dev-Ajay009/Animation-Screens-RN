import axios from 'axios';



export async function apiReq(
  endPoint,
  data,
  method,
  headers,
  requestOptions = {},
) {
  return new Promise(async (res, rej) => {
    headers = {
      ...headers,
    };
    if (method === 'get' || method === 'delete') {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }

    axios[method](endPoint, data, {headers})
      .then(result => {
        // result && setNetworkError(false)
        const {data} = result;

        if (data?.Message?.trim() != 'Not Authorized') {
          // if (data.status === false) {
          // 	return rej(data);
          // }
          return res(data);
        } else {
        //   setNotAutherised(true);
          console.log('Not Authorized->', data?.Message, endPoint);
          return rej(data);
        }
      })
      .catch(error => {
        // setNetworkError(true)
        console.log(error && error.response, 'the error respne');
        if (error && error.response && error.response.data) {
          if (!error.response.data.message) {
            return rej({
              ...error.response.data,
              msg: error.response.data.message || 'Network Error',
            });
          }
          return rej(error.response.data);
        } else {
          return rej({message: 'Network Error', msg: 'Network Error'});
        }
        return rej(error);
      });
  });
}
export function apiPost(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'post', headers);
}

export function apiDelete(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'delete', headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, 'get', headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'put', headers);
}
