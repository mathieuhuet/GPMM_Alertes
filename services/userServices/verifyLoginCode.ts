import axios from 'axios';
import { GPMM_USER_API } from '../../secret';
const API = GPMM_USER_API
? GPMM_USER_API
: 'http://192.168.1.5:10101/user';

export const verifyUser = (data: any) => {
  return new Promise((resolve, reject) => {
    console.log(API, '/verify');
    axios.post(
      `${API}/verify`, 
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then((response) => {
      const { data } = response;
      resolve(data);
    }).catch(err => {
      try {
        if (err.response.data.error) {
          reject(err.response.data);
        }
      } catch (error) {
        reject(err);
      }
    })
  })
}