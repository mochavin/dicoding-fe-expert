class RestaurantList extends HTMLElement {
  connectedCallback() {
    this.restaurants = [];
    this.filteredRestaurants = [];
    this.selectedCategory = "All";
    this.loadData();
    this.setupCategories();
  }

  setupCategories() {
    const categories = document.createElement("restaurant-categories");
    categories.addEventListener("categoryChange", (e) => {
      this.selectedCategory = e.detail;
      this.filterRestaurants();
    });
    this.prepend(categories);
  }

  filterRestaurants() {
    this.filteredRestaurants =
      this.selectedCategory === "All"
        ? this.restaurants
        : this.restaurants.filter((r) =>
            r.categories?.includes(this.selectedCategory)
          );
    this.renderRestaurants();
  }

  async loadData() {
    try {
      const response = await fetch("./data/DATA.json");
      const data = await response.json();
      this.restaurants = data.restaurants;
      this.filteredRestaurants = this.restaurants;
      this.render();
    } catch (error) {
      console.error("Error loading restaurants:", error);
    }
  }

  render() {
    this.innerHTML = `
      <h2 class="restaurant-list-title">Explore Restaurants</h2>
    `;
    this.setupCategories();
    this.renderRestaurants();
  }

  renderRestaurants() {
    const listContainer = document.createElement("div");
    listContainer.className = "restaurant-list";
    listContainer.innerHTML = this.filteredRestaurants
      .map(
        (restaurant) => `
        <a href="#" 
           class="restaurant-card" 
           tabindex="0" 
           role="article" 
           aria-label="${restaurant.name} restaurant in ${restaurant.city}">
          <img src="${restaurant.pictureId}" alt="${restaurant.name}">
          <div class="restaurant-info">
            <h2>${restaurant.name}</h2>
            <div class="restaurant-meta">
              <span class="city">📍 ${restaurant.city}</span>
              <span class="rating">⭐ ${restaurant.rating}</span>
            </div>
            <div class="category-tags">
              ${restaurant.categories
                .map(
                  (category) => `<span class="category-tag">${category}</span>`
                )
                .join("")}
            </div>
            <p>${restaurant.description.substring(0, 150)}...</p>
          </div>
        </a>
      `
      )
      .join("");

    const oldList = this.querySelector(".restaurant-list");
    if (oldList) {
      oldList.replaceWith(listContainer);
    } else {
      this.appendChild(listContainer);
    }
  }
}

customElements.define("restaurant-list", RestaurantList);
