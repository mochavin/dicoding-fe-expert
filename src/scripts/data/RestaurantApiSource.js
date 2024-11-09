import API_ENDPOINT from '../globals/api-endpoint'

class RestaurantApiSource {
  static async getAllRestaurants() {
    try {
      const response = await fetch(API_ENDPOINT.resturant_list);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      throw new Error('Error while fetching restaurants');
    }
  }

  static async getRestaurantDetail(id) {
    try {
      const response = await fetch(API_ENDPOINT.restaurant_detail + id);
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      throw new Error('Error while fetching restaurant detail');
    }
  }

  static async addReview(review) {
    try {
      const response = await fetch(API_ENDPOINT.add_comment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review)
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      throw new Error('Error while adding review');
    }
  }
}

export default RestaurantApiSource;