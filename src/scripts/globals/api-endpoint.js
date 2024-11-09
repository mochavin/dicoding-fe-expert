import CONFIG from './config';

const API_ENDPOINT = {
  resturantList: `${CONFIG.BASE_URL}/list`,
  restaurantDetail: `${CONFIG.BASE_URL}/detail/`,
  addComment: `${CONFIG.BASE_URL}/review`,
};

export default API_ENDPOINT;
