class RestaurantCategories extends HTMLElement {
  connectedCallback() {
    this.categories = [
      "All",
      "Indonesian",
      "Chinese",
      "Japanese",
      "Western",
      "Middle Eastern"
    ];
    this.render();
    this.addEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="categories">
        ${this.categories.map(category => `
          <button 
            class="category-btn ${category === 'All' ? 'active' : ''}"
            data-category="${category}">
            ${category}
          </button>
        `).join('')}
      </div>
    `;
  }

  addEventListeners() {
    const buttons = this.querySelectorAll('.category-btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.dispatchEvent(new CustomEvent('categoryChange', {
          detail: button.dataset.category
        }));
      });
    });
  }
}

customElements.define('restaurant-categories', RestaurantCategories);