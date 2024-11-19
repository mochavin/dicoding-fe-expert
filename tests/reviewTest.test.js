import { describe, it, expect, beforeEach } from "@jest/globals";
import RestaurantApiSource from "../src/scripts/data/RestaurantApiSource";

describe("Restaurant Review Feature", () => {
  const validReview = {
    id: "zvf11c0sukfw1e867",
    name: "John Doe",
    review: "Great restaurant with excellent service"
  };

  // Positive Cases 
  describe("Positive Cases", () => {
    it("should successfully add review when all fields are filled correctly", async () => {
      const response = await RestaurantApiSource.addReview(validReview);
      expect(response.error).toBeFalsy();
      expect(response.customerReviews).toBeDefined();
      expect(response.customerReviews.length).toBeGreaterThan(0);
    });

    it("should include the new review in customerReviews array", async () => {
      const response = await RestaurantApiSource.addReview(validReview);
      const latestReview = response.customerReviews[response.customerReviews.length - 1];
      
      expect(latestReview.name).toBe(validReview.name);
      expect(latestReview.review).toBe(validReview.review);
      expect(latestReview.date).toBeDefined();
    });

    it("should handle reviews with special characters", async () => {
      const reviewWithSpecialChars = {
        ...validReview,
        review: "Great food! & excellent service @ reasonable price$ #recommended"
      };
      
      const response = await RestaurantApiSource.addReview(reviewWithSpecialChars);
      expect(response.error).toBeFalsy();
    });
  });

  // Negative Cases
  describe("Negative Cases", () => {
    it("should throw error when adding review without restaurant ID", async () => {
      const invalidReview = { ...validReview };
      delete invalidReview.id;

      await expect(
        RestaurantApiSource.addReview(invalidReview)
      ).rejects.toThrow();
    });

    it("should throw error when adding review without name", async () => {
      const invalidReview = { ...validReview };
      delete invalidReview.name;

      await expect(
        RestaurantApiSource.addReview(invalidReview)
      ).rejects.toThrow();
    });

    it("should throw error when adding review without review text", async () => {
      const invalidReview = { ...validReview };
      delete invalidReview.review;

      await expect(
        RestaurantApiSource.addReview(invalidReview)
      ).rejects.toThrow();
    });

    it("should throw error when adding empty review text", async () => {
      const invalidReview = {
        ...validReview,
        review: ""
      };

      await expect(
        RestaurantApiSource.addReview(invalidReview)
      ).rejects.toThrow();
    });

    it("should throw error when adding very long review text", async () => {
      const invalidReview = {
        ...validReview,
        review: "a".repeat(1001) 
      };

      await expect(
        RestaurantApiSource.addReview(invalidReview)
      ).rejects.toThrow();
    });
  });

  // Edge Cases
  describe("Edge Cases", () => {
    it("should handle multiple reviews from same user", async () => {
      const firstReview = await RestaurantApiSource.addReview(validReview);
      const secondReview = await RestaurantApiSource.addReview(validReview);

      expect(firstReview.error).toBeFalsy();
      expect(secondReview.error).toBeFalsy();
    });

    it("should handle concurrent review submissions", async () => {
      const reviews = [
        {...validReview, name: "User 1"},
        {...validReview, name: "User 2"},
        {...validReview, name: "User 3"}
      ];

      const results = await Promise.all(
        reviews.map(review => RestaurantApiSource.addReview(review))
      );

      results.forEach(response => {
        expect(response.error).toBeFalsy();
      });
    });
  });
});