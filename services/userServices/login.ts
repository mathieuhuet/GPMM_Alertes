import axios from 'axios';
import { FRIENDLYBETS_USER_API } from '../../secret';
const API = FRIENDLYBETS_USER_API
? FRIENDLYBETS_USER_API
: 'http://192.168.1.5:10101/user';

export const loginEmail = (credentials) => {
  return new Promise((resolve, reject) => {
    console.log(API);
    axios.post(
      `${API}/login`, 
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
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