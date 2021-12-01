import axios from "axios";
import {isAuthenticated, getAccessToken} from './session'

// export const baseUrl = "http://localhost:8080/";
export const baseUrl = "https://glass-api.mirobotic.tech/";

export const signInApi = "accounts/sign-in/";
export const signUpApi = "accounts/sign-up/";
export const profileApi = "accounts/profile/";
export const resetPasswordApi = "accounts/reset-password/";


export const routs = {
    signin : `${baseUrl}accounts/sign-in/`,
    signup : `${baseUrl}accounts/sign-up/`,
}

export function getRouts() {
    return {
        signin : `${baseUrl}accounts/sign-in/`,
        signup : `${baseUrl}accounts/sign-up/`,
        profile : `${baseUrl}accounts/profile/`,
    }
}

export function apiCallSecureGet(api, response, error) {

  console.log('apiCallSecureGet ', api);

    axios
    .get(`${baseUrl}${api}/test`, 
      {
        headers: {
          'Authorization': `Token ${getAccessToken()}`
          }
      }
    )
    .then((res) => {
        console.warn('result', res)
        const result = res.data;
        if(result.code === 200) {
            response(result)
        }else {
            error(result.msg)
        }
    })
    .catch((err) => {
      if (err.response) {
        error(err.response.data.msg)
      } else if (err.request) {
        console.log(err.request);
        error(err.request)
      } else {
        console.log('Error', err.message);
        error(`Error ${err.message}`)
      }
      console.log(err.config);
    });

}

export function apiPostUnsecure(api, data, response, error) {

    console.log('apiPostUnsecure ', api, 'data ', data);

    axios
    .post(`${baseUrl}${api}`, data)
    .then((res) => {
        console.warn('result', res)

        const result = res.data;

        if(result.code === 200) {
            response(result)
        }else {
            error(result.msg)
        }

    })
    .catch((err) => {
        if (err.response) {
            error(err.response.data.msg)
          } else if (err.request) {
            console.log(err.request);
            error(err.request)
          } else {
            console.log('Error', err.message);
            error(`Error ${err.message}`)
          }
          console.log(err.config);
    });
}


export function apiPostSecure(api, data, response, error) {

  console.log('apiPostSecure ', api, 'data ', data);

  axios
  .post(
      `${baseUrl}${api}`,
      data,
      {
        headers: {
          'Authorization': `Token ${getAccessToken()}`
          }
      }
    )
  .then((res) => {
      console.warn('result', res)

      const result = res.data;

      if(result.code === 200) {
          response(result)
      }else {
          error(result.msg)
      }

  })
  .catch((err) => {
      if (err.response) {
          error(err.response.data.msg)
        } else if (err.request) {
          console.log(err.request);
          error(err.request)
        } else {
          console.log('Error', err.message);
          error(`Error ${err.message}`)
        }
        console.log(err.config);
  });
}

export function apiPutSecure(api, data, response, error) {

  console.log('apiPutSecure ', api, 'data ', data);

  axios
  .put(
      `${baseUrl}${api}`,
      data,
      {
        headers: {
          'Authorization': `Token ${getAccessToken()}`
          }
      }
    )
  .then((res) => {
      console.warn('result', res)

      const result = res.data;

      if(result.code === 200) {
          response(result)
      }else {
          error(result.msg)
      }

  })
  .catch((err) => {
      if (err.response) {
          error(err.response.data.msg)
        } else if (err.request) {
          console.log(err.request);
          error(err.request)
        } else {
          console.log('Error', err.message);
          error(`Error ${err.message}`)
        }
        console.log(err.config);
  });
}

export default getRouts;


