class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.afterRender();
  }

  render() {
    this.innerHTML = `
      <nav class="navbar">
        <div class="navbar-brand">
          <button id="hamburger" aria-label="navigation menu">☰</button>
          <img src="./images/logo.svg" alt="Logo" class="navbar-logo">
        </div>
        
        <ul id="drawer" class="navbar-menu">
          <li><a href="/">Home</a></li>
          <li><a href="#/favorite">Favorite</a></li>
          <li><a href="https://moch-avin.netlify.app/" target="_blank">About Us</a></li>
        </ul>
      </nav>
    `;
  }

  afterRender() {
    const hamburger = this.querySelector("#hamburger");
    const drawer = this.querySelector("#drawer");

    hamburger.addEventListener("click", (event) => {
      drawer.classList.toggle("open");
      event.stopPropagation();
    });

    document.addEventListener("click", (event) => {
      if (!drawer.contains(event.target) && !hamburger.contains(event.target)) {
        drawer.classList.remove("open");
      }
    });
  }
}

customElements.define("nav-bar", NavBar);
