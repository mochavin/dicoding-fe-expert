import { describe, it, expect, beforeEach } from "@jest/globals";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";

describe("Liking A Restaurant", () => {
  const testRestaurant = {
    id: "ygewwl55ktckfw1e867",
    name: "Istana Emas",
    description:
      "Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
    pictureId: "05",
    city: "Balikpapan",
    rating: 4.6,
  };

  beforeEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(testRestaurant.id);
  });

  it("should be able to like a restaurant", async () => {
    await FavoriteRestaurantIdb.putRestaurant(testRestaurant);
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(
      testRestaurant.id
    );
    expect(restaurant).toEqual(testRestaurant);
  });

  it("should throw error when trying to add restaurant without id", async () => {
    const restaurantWithoutId = { ...testRestaurant };
    delete restaurantWithoutId.id;

    await expect(
      FavoriteRestaurantIdb.putRestaurant(restaurantWithoutId)
    ).rejects.toThrowError("Restaurant ID is required");

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toHaveLength(0);
  });
});

describe("Unliking A Restaurant", () => {
  const testRestaurant = {
    id: "ygewwl55ktckfw1e867",
    name: "Istana Emas",
    description:
      "Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
    pictureId: "05",
    city: "Balikpapan",
    rating: 4.6,
  };

  beforeEach(async () => {
    await FavoriteRestaurantIdb.putRestaurant(testRestaurant);
  });

  it("should be able to remove liked restaurant", async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(testRestaurant.id);
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toHaveLength(0);
  });

  it("should not throw error when trying to remove non-existent restaurant", async () => {
    await FavoriteRestaurantIdb.deleteRestaurant("non-existent-id");
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toHaveLength(1);
  });
});
