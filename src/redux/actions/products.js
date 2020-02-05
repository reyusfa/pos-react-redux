import axios from 'axios';
import qs from 'qs';

const requestProducts = ({ headers, params }) => {
  const config = {
    headers,
    params,
    paramsSerializer: params => {
      return qs.stringify(params);
    }
  }
  return {
    type: 'GET_PRODUCTS',
    payload: axios.get(`${process.env.REACT_APP_API_HOST}/products`, config)
  }
}

export {
  requestProducts
};
