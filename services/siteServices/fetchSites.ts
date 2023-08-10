import axios from 'axios';
import { GPMM_SITE_API } from '../../secret';
const API = GPMM_SITE_API
? GPMM_SITE_API
: 'http://192.168.1.5:10101/bet';

export const fetchSites = (accessToken: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(API);
      const response = await axios.get(
        `${API}/fetchSites`, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
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