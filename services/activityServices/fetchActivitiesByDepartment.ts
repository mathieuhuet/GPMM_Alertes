import axios from 'axios';
import { GPMM_ACTIVITY_API } from '../../secret';
const API = GPMM_ACTIVITY_API
? GPMM_ACTIVITY_API
: 'http://192.168.1.5:10101/bet';

export const fetchActivitiesByDepartment = (accessToken: string, department: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(API, '/fetchActivitiesByDepartment');
      const response = await axios.post(
        `${API}/fetchActivitiesByDepartment`,
        department,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          }
        }
      )
      const { data } = response;
      resolve(data);
    } catch (err: any) {
      try {
        if (err.response.data.error) {
          reject(err.response.data);
        }
      } catch (error) {
        reject(err);
      }
    }
  })
}