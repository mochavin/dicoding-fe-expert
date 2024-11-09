import Router from '../utils/router';
import routes from '../routes/routes';

class App {
  constructor({ content }) {
    this._content = content;
    this._heroSection = document.querySelector('.hero');
  }

  async renderPage() {
    try {
      const url = Router.parseActiveUrlWithCombiner();
      const page = routes[url];

      if (!page) {
        throw new Error('Page not found');
      }

      if (url.includes('detail')) {
        this._heroSection.style.display = 'none';
      } else {
        this._heroSection.style.display = 'block';
      }

      this._content.innerHTML = '';
      this._content.appendChild(page);

      if (url.includes('detail')) {
        const parsedUrl = Router.parseActiveUrlWithoutCombiner();
        if (typeof page.loadDetail === 'function') {
          await page.loadDetail(parsedUrl.id);
        } else {
          throw new Error('Detail page loading not implemented');
        }
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      this._content.innerHTML = `
        <div class="error-container">
          <p>Failed to load page: ${error.message}</p>
        </div>
      `;
    }
  }
}

export default App;
