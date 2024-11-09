import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/_index.scss';
import './components';
import App from './views/app';

const app = new App({
  content: document.querySelector('#main-section'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  registerServiceWorker();
});

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
      console.log('Service worker registered');
    } catch (error) {
      console.log('Failed to register service worker', error);
    }
  }
}