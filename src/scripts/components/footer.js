class FooterBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer>
        <div class="footer-content">
          <div class="footer-logo">
            <h2>VANI RESTO</h2>
            <p>Discover extraordinary culinary experiences</p>
          </div>
          <div class="footer-links">
            <a href="#home">Home</a>
            <a href="https://moch-avin.netlify.app/" target="_blank">About Us</a>
            <a href="#favorite">Favorite</a>
          </div>
          <p class="copyright">&copy; 2024 VANI RESTO. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-bar', FooterBar);