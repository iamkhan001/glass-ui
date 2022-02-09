import axios from "axios";
import {isAuthenticated, getAccessToken} from './session'

// export const baseUrl = "http://localhost:8080/";

export const baseUrl = "https://glass-api.mirobotic.tech/";
export const zoomUrl = "https://api.zoom.us/v2";

const zoomToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjVNUHV4ZTR5UVYtYldHclFYU1N1ZUEiLCJleHAiOjE2NDg3NTEzOTksImlhdCI6MTY0MTI3NjgxOH0.yyppd6thcgti7NhfMYx3jUJiU1RpJr-Dipa3hTx4914"


export const zoomConnectUrl = 'https://zoom.us/oauth/authorize?client_id=StvnB7AzT4ei1_thga9krg&response_type=code&redirect_uri=https%3A%2F%2Fglass.mirobotic.tech%2Fauthentication%2Fzoom';
export const zoomAuthApi = "zoom/auth/";

export const signInApi = "accounts/sign-in/";
export const signUpApi = "accounts/sign-up/";
export const profileApi = "accounts/profile/";
export const profileUpdateApi = "accounts/update-account/";
export const resetPasswordApi = "accounts/reset-password/";
export const meetingsApi = "zoom/meetings/";
export const usersApi = "zoom/users/";

export const membersApi = "accounts/members/";
export const memberUpdateApi = "accounts/update-member/";
export const memeberActivateApi = "accounts/activate-member/";
export const memberDeleteApi = "accounts/delete-member/";
export const verifyTokenApi = "accounts/verify-token/";
export const activateAccountApi = "accounts/activate/";

export const zoomMeetings = 'https://api.zoom.us/v2/users/jovy@mirobotic.sg/meetings'
const proxyurl = "https://cors-anywhere.herokuapp.com/";

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

export function apiCallUnsecureGet(api, response, error) {

  console.log('apiCallSecureGet ', api);
  axios
    .get(`${baseUrl}${api}`)
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

export function zoomApiCallGet(api, response, error) {

  console.log('apiCallSecureGet ', api);
  axios
    .get(`${api}`, 
      {
        headers: {
          'Authorization': `Bearer ${zoomToken}`
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

export function zoomApiCallPost(api, data, response, error) {

  console.log('zoomApiCallPost ', api, 'data ', data);

  axios
  .post(
      `${api}`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${zoomToken}`
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


export function apiCallSecureGet(api, response, error) {

  const url = `${baseUrl}${api}`;
  console.log('apiCallSecureGet ', url);
  axios
    .get(url, 
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


export function apiPostSecure(api, data, response, onError) {

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
      console.log('result', res.data)

      const result = res.data;

      if(result.code === 200) {
          response(result)
      }else {
        onError(result.msg)
      }

  })
  .catch((err) => {
    try {

      console.log('error', err.response)

      if (err.response) {
        onError(err.response.data.msg)
      } else if (err.request) {
        console.log(err.request);
        onError(err.request)
      } else {
        console.log('Error', err.message);
        onError(`Error ${err.message}`)
      }
    }catch(e) {
      console.log(e);
      onError('Something went wrong!')
    }
      console.log(err.config);
  });
}

export function createZoomUser(data, response, error) {

  console.log('createZoomUser ', data);

  axios
  .post(
      `${zoomUrl}/users`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${zoomToken}`
          }
      }
    )
  .then((res) => {
      console.warn('result ok', res)
  })
  .catch((err) => {
    console.warn('result err', err)
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

export function getZoomMeetings(response, error) {

  console.log('getZoomMeetings ');

  const requestOptions = {
    method: 'GET',
    headers: { 
      'Authorization': `Bearer ${zoomToken}`,
    },
  };

  fetch(`https://api.zoom.us/v2/users/jovy@mirobotic.sg/meetings`, requestOptions)
      .then(res => {
        console.warn('result >', res)
        response(res.json())
      })
      .then(data => {
        console.warn('error >>', data)
        error(data)
      })
      .catch(err => {
        console.warn('error >>>', err)
        error("Server error")
      })

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


