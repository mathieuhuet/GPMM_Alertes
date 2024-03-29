import axios from 'axios';
import { GPMM_USER_API } from '../../secret';
const API = GPMM_USER_API
? GPMM_USER_API
: 'http://192.168.1.5:10101/user';

export const fetchUsersByDepartment = (department: any, accessToken: string) => {
  return new Promise((resolve, reject) => {
    console.log(API, 'fetchUsersByDepartment');
    axios.post(
      `${API}/fetchUsersByDepartment`, 
      department,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
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