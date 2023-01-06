import axios from 'axios';

type AxiosMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

const DOMAIN_ENV =
  process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SERVER_API : 'http://localhost:3000/';
axios.defaults.withCredentials = true;
export const customAxios = async (method: AxiosMethod, url: string, data?: any): Promise<any> => {
  return await axios({
    method,
    url: DOMAIN_ENV + 'api' + url,
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
export default customAxios;
