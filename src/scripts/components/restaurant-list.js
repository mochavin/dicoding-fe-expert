import RestaurantApiSource from '../data/RestaurantApiSource';
import CONFIG from '../globals/config';

class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this.restaurants = [];
    this.isLoading = true;
  }

  connectedCallback() {
    this.loadData();
  }

  async loadData() {
    try {
      this.renderLoading();
      const data = await RestaurantApiSource.getAllRestaurants();
      this.restaurants = data;
      this.isLoading = false;
      this.render();
    } catch (error) {
      console.error('Error loading restaurants:', error);
      this.renderError(error);
    }
  }

  renderLoading() {
    this.innerHTML = `
      <div class="loading-indicator">
        <div class="loading-spinner" role="progressbar" aria-label="Loading restaurants"></div>
        <p>Loading restaurants...</p>
      </div>
    `;
  }

  renderError(error) {
    this.innerHTML = `
      <div class="error-container">
        <p>Failed to load restaurants: ${error.message}</p>
      </div>
    `;
  }

  render() {
    if (this.isLoading) return;

    this.innerHTML = `
      <h2 class="restaurant-list-title">Explore Restaurants</h2>
      <div class="restaurant-list">
        ${this.restaurants
    .map(
      (restaurant) => `
          <a href="#/detail/${restaurant.id}" 
             class="restaurant-card" 
             tabindex="0" 
             role="article" 
             aria-label="${restaurant.name} restaurant in ${restaurant.city}">
            <img src="${CONFIG.IMAGE_URL}/${restaurant.pictureId}" 
            alt="${restaurant.name}"
            loading="lazy"/>
            <div class="restaurant-info">
              <h2>${restaurant.name}</h2>
              <div class="restaurant-meta">
                <span class="city">📍 ${restaurant.city}</span>
                <span class="rating">⭐ ${restaurant.rating}</span>
              </div>
              <p>${restaurant.description.substring(0, 150)}...</p>
            </div>
          </a>
        `
    )
    .join('')}
      </div>
    `;
  }
}

customElements.define('restaurant-list', RestaurantList);
export default RestaurantList;
