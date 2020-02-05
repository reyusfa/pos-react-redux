import axios from 'axios';
import qs from 'qs';

const requestCategories = ({ headers, params }) => {
  const config = {
    headers,
    params,
    paramsSerializer: params => {
      return qs.stringify(params);
    }
  }
  return {
    type: 'GET_CATEGORIES',
    payload: axios.get(`${process.env.REACT_APP_API_HOST}/categories`, config)
  }
}

export {
  requestCategories
};
