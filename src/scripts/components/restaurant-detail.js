import RestaurantApiSource from "../data/RestaurantApiSource";
import CONFIG from "../globals/config";
import FavoriteRestaurantIdb from "../data/favorite-restaurant-idb";

class RestaurantDetail extends HTMLElement {
  constructor() {
    super();
    this.restaurant = null;
    this.isLoading = true;
  }

  connectedCallback() {
    this.renderLoading();
  }

  async loadDetail(id) {
    try {
      this.renderLoading();
      const data = await RestaurantApiSource.getRestaurantDetail(id);
      this.restaurant = data;
      this.isLoading = false;
      await this.render();
      await this.initializeFavoriteButton();
    } catch (error) {
      console.error("Error loading restaurant detail:", error);
      this.renderError(error);
    }
  }

  async initializeFavoriteButton() {
    const favoriteButton = this.querySelector("#favoriteButton");
    if (!favoriteButton) {
      console.error("Failed to initialize favorite button");
      return;
    }

    try {
      if (await this.isRestaurantFavorited(this.restaurant.id)) {
        this.renderLikedButton();
      } else {
        this.renderLikeButton();
      }

      favoriteButton.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
          if (await this.isRestaurantFavorited(this.restaurant.id)) {
            await FavoriteRestaurantIdb.deleteRestaurant(this.restaurant.id);
            this.renderLikeButton();
          } else {
            const restaurantData = {
              id: this.restaurant.id,
              name: this.restaurant.name,
              description: this.restaurant.description,
              pictureId: this.restaurant.pictureId,
              city: this.restaurant.city,
              rating: this.restaurant.rating,
            };
            await FavoriteRestaurantIdb.putRestaurant(restaurantData);
            this.renderLikedButton();
          }
        } catch (error) {
          console.error("Error updating favorite status:", error);
        }
      });
    } catch (error) {
      console.error("Error initializing favorite button:", error);
    }
  }

  async isRestaurantFavorited(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  }

  renderLikeButton() {
    const favoriteButton = this.querySelector("#favoriteButton");
    if (!favoriteButton) {
      console.error("Favorite button not found");
      return;
    }
    favoriteButton.innerHTML = `
      <i class="far fa-heart" aria-hidden="true"></i>
      <span>Add to Favorites</span>
    `;
  }

  renderLikedButton() {
    const favoriteButton = this.querySelector("#favoriteButton");
    if (!favoriteButton) {
      console.error("Favorite button not found");
      return;
    }
    favoriteButton.innerHTML = `
      <i class="fas fa-heart" aria-hidden="true"></i>
      <span>Remove from Favorites</span>
    `;
  }

  renderLoading() {
    this.innerHTML = `
      <div class="loading-indicator">
        <p>Loading restaurant details...</p>
      </div>
    `;
  }

  renderError(error) {
    this.innerHTML = `
      <div class="error-container">
        <p>Failed to load restaurant details: ${error.message}</p>
      </div>
    `;
  }

  render() {
    if (this.isLoading) return;

    this.innerHTML = `
      <div class="restaurant-detail">
        <div class="restaurant-hero">
          <img src="${CONFIG.IMAGE_URL}/${this.restaurant.pictureId}" alt="${
      this.restaurant.name
    }">
          <div class="restaurant-info">
            <h1>${this.restaurant.name}</h1>
            <div class="restaurant-meta">
              <span class="city">📍 ${this.restaurant.city}</span>
              <span class="address">🏠 ${this.restaurant.address}</span>
              <span class="rating">⭐ ${this.restaurant.rating}</span>
            </div>
          </div>
        </div>

        <div class="restaurant-description">
          <h2>About</h2>
          <p>${this.restaurant.description}</p>
        </div>

        <div class="restaurant-menus">
          <div class="menu-section">
            <h2>Foods</h2>
            <ul>
              ${this.restaurant.menus.foods
                .map(
                  (food) => `
                <li>${food.name}</li>
              `
                )
                .join("")}
            </ul>
          </div>
          <div class="menu-section">
            <h2>Drinks</h2>
            <ul>
              ${this.restaurant.menus.drinks
                .map(
                  (drink) => `
                <li>${drink.name}</li>
              `
                )
                .join("")}
            </ul>
          </div>
        </div>

        <div class="restaurant-reviews">
          <h2>Customer Reviews</h2>
          ${this.restaurant.customerReviews
            .map(
              (review) => `
            <div class="review-card">
              <div class="review-header">
                <strong>${review.name}</strong>
                <span>${review.date}</span>
              </div>
              <p>${review.review}</p>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="favorite-container">
          <button id="favoriteButton" class="favorite-button">
            <i class="far fa-heart" aria-hidden="true"></i>
            <span>Add to Favorites</span>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("restaurant-detail", RestaurantDetail);
export default RestaurantDetail;
