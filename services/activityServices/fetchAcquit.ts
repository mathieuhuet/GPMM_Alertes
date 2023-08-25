import axios from 'axios';
import { GPMM_ACTIVITY_API } from '../../secret';
const API = GPMM_ACTIVITY_API
? GPMM_ACTIVITY_API
: 'http://192.168.1.5:10101/bet';

export const fetchAcquit = (accessToken: string, activityTypeAndId: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(API, '/fetchAcquit');
      const response = await axios.post(
        `${API}/fetchAcquit`,
        activityTypeAndId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          }
        }
      )
      const { data } = response;
      resolve(data);
    } catch (error) {
      reject(error)
    }
  })
}