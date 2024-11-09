import RestaurantList from '../components/restaurant-list';
import RestaurantDetail from '../components/restaurant-detail';

const routes = {
  '/': new RestaurantList(),
  '/detail/:id': new RestaurantDetail(),
};

export default routes;