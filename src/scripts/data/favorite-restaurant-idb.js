import { openDB } from 'idb';

const DATABASE_NAME = 'restaurant-catalogue';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'restaurants';

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    const restaurant = await (await dbPromise).get(OBJECT_STORE_NAME, id);
    return restaurant || null;
  },
  async getAllRestaurants() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putRestaurant(restaurant) {
    if (!restaurant.id) {
      throw new Error('Restaurant ID is required');
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteRestaurant(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteRestaurantIdb;
