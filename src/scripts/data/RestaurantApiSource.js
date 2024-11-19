import axios from "axios";
import API_ENDPOINT from "../globals/api-endpoint";

class RestaurantApiSource {
  static async getAllRestaurants() {
    try {
      const response = await axios.get(API_ENDPOINT.resturantList);
      return response.data.restaurants;
    } catch (error) {
      throw new Error("Error while fetching restaurants");
    }
  }

  static async getRestaurantDetail(id) {
    try {
      const response = await axios.get(API_ENDPOINT.restaurantDetail + id);
      return response.data.restaurant;
    } catch (error) {
      throw new Error("Error while fetching restaurant detail");
    }
  }

  static async addReview(review) {
    try {
      if (review.review.length > 1000) {
        throw new Error("Review text is too long");
      }
      const response = await axios.post(API_ENDPOINT.addComment, review, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while adding review:", error);
      throw new Error("Error while adding review");
    }
  }
}

export default RestaurantApiSource;
