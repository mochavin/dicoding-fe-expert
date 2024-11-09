import RestaurantApiSource from "../data/RestaurantApiSource";
import CONFIG from "../globals/config";

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
      this.render();
    } catch (error) {
      console.error("Error loading restaurant detail:", error);
      this.renderError(error);
    }
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
          <img src="${CONFIG.IMAGE_URL}/${this.restaurant.pictureId}" alt="${this.restaurant.name}">
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
              ${this.restaurant.menus.foods.map(food => `
                <li>${food.name}</li>
              `).join('')}
            </ul>
          </div>
          <div class="menu-section">
            <h2>Drinks</h2>
            <ul>
              ${this.restaurant.menus.drinks.map(drink => `
                <li>${drink.name}</li>
              `).join('')}
            </ul>
          </div>
        </div>

        <div class="restaurant-reviews">
          <h2>Customer Reviews</h2>
          ${this.restaurant.customerReviews.map(review => `
            <div class="review-card">
              <div class="review-header">
                <strong>${review.name}</strong>
                <span>${review.date}</span>
              </div>
              <p>${review.review}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define("restaurant-detail", RestaurantDetail);
export default RestaurantDetail;