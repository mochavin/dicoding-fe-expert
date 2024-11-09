import RestaurantList from "../components/restaurant-list";
import RestaurantDetail from "../components/restaurant-detail";
import FavoriteRestaurantList from "../components/favorite-restaurant-list";

const routes = {
  "/": new RestaurantList(),
  "/detail/:id": new RestaurantDetail(),
  "/favorite": new FavoriteRestaurantList(),
};

export default routes;
