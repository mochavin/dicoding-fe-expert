import { describe, it, expect, beforeEach } from '@jest/globals';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

const testRestaurant = {
  id: 'test-restaurant',
  name: 'Test Restaurant',
  description: 'Restaurant for testing',
  pictureId: 'test-pic',
  city: 'Test City',
  rating: 4.5,
};

describe('Favorite Restaurant Database', () => {
  beforeEach(async () => {
    // Clear the database before each test
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    restaurants.forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  // Positive Cases
  it('should be able to add restaurant to favorites', async () => {
    await FavoriteRestaurantIdb.putRestaurant(testRestaurant);
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(
      testRestaurant.id
    );
    expect(restaurant).toEqual(testRestaurant);
  });

  it('should be able to get all favorite restaurants', async () => {
    await FavoriteRestaurantIdb.putRestaurant(testRestaurant);
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toHaveLength(1);
    expect(restaurants[0]).toEqual(testRestaurant);
  });

  it('should be able to remove restaurant from favorites', async () => {
    await FavoriteRestaurantIdb.putRestaurant(testRestaurant);
    await FavoriteRestaurantIdb.deleteRestaurant(testRestaurant.id);
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toHaveLength(0);
  });

  // Negative Cases
  it('should throw error when adding favorite restaurant without ID', async () => {
    const invalidRestaurant = { ...testRestaurant };
    delete invalidRestaurant.id;

    await expect(
      FavoriteRestaurantIdb.putRestaurant(invalidRestaurant)
    ).rejects.toThrowError('Restaurant ID is required');
  });

  it('should return null when getting non-existent restaurant', async () => {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(
      'non-existent-id'
    );
    expect(restaurant).toBeNull();
  });

  it('should not fail when deleting non-existent restaurant', async () => {
    await expect(
      FavoriteRestaurantIdb.deleteRestaurant('non-existent-id')
    ).resolves.not.toThrow();
  });

  it('should return empty array when no favorites exist', async () => {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toHaveLength(0);
    expect(Array.isArray(restaurants)).toBe(true);
  });
});
