import FavoriteRestaurantIdb from "../data/favorite-restaurant-idb";
import CONFIG from "../globals/config";

class FavoriteRestaurantList extends HTMLElement {
  constructor() {
    super();
    this.restaurants = [];
    this.isLoading = true;
  }

  connectedCallback() {
    this.loadFavorites();
  }

  async loadFavorites() {
    try {
      this.renderLoading();
      this.restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      this.isLoading = false;
      this.render();
    } catch (error) {
      console.error("Error loading favorites:", error);
      this.renderError(error);
    }
  }

  renderLoading() {
    this.innerHTML = `
      <div class="loading-indicator">
        <div class="loading-spinner"></div>
        <p>Loading favorite restaurants...</p>
      </div>
    `;
  }

  renderError(error) {
    this.innerHTML = `
      <div class="error-container">
        <p>Failed to load favorite restaurants: ${error.message}</p>
      </div>
    `;
  }

  renderEmptyFavorites() {
    this.innerHTML = `
      <div class="empty-favorites">
        <h2>No Favorite Restaurants</h2>
        <p>You haven't added any restaurants to your favorites yet.</p>
        <a href="/" class="explore-link">Explore Restaurants</a>
      </div>
    `;
  }

  render() {
    if (this.isLoading) return;

    if (!this.restaurants.length) {
      this.renderEmptyFavorites();
      return;
    }

    this.innerHTML = `
      <h2 class="favorite-list-title">Your Favorite Restaurants</h2>
      <div class="restaurant-list">
        ${this.restaurants
          .map(
            (restaurant) => `
          <a href="#/detail/${restaurant.id}" 
             class="restaurant-card" 
             aria-label="${restaurant.name} restaurant in ${restaurant.city}">
            <img src="${CONFIG.IMAGE_URL}/${restaurant.pictureId}" 
                 alt="${restaurant.name}">
            <div class="restaurant-info">
              <h2>${restaurant.name}</h2>
              <div class="restaurant-meta">
                <span class="city">📍 ${restaurant.city}</span>
                <span class="rating">⭐ ${restaurant.rating}</span>
              </div>
              <p>${restaurant.description?.substring(0, 150)}...</p>
            </div>
          </a>
        `
          )
          .join("")}
      </div>
    `;
  }
}

customElements.define("favorite-restaurant-list", FavoriteRestaurantList);
export default FavoriteRestaurantList;
