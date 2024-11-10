import Router from '../utils/router';
import routes from '../routes/routes';

class App {
  constructor({ content }) {
    this._content = content;
    this._heroSection = document.querySelector('.hero');
    this._skipLink = document.querySelector('.skip-link');
    this._mainContent = document.querySelector('#main-section');
  }

  _updateSkipLink(url) {
    const contentTargets = {
      '/': '#main-section',
      '/detail': '#detail-content',
      '/favorite': '#favorite-content',
    };

    const target = contentTargets[url] || '#main-section';
    this._skipLink.setAttribute('href', target);

    this._skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetElement = document.querySelector(target);
      if (targetElement) {
        targetElement.tabIndex = -1;
        targetElement.focus();
        targetElement.addEventListener(
          'blur',
          () => {
            targetElement.removeAttribute('tabIndex');
          },
          { once: true }
        );
      }
    });
  }

  async renderPage() {
    try {
      const url = Router.parseActiveUrlWithCombiner();
      const page = routes[url];

      if (!page) {
        throw new Error('Page not found');
      }

      this._updateSkipLink(url);

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
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default App;
