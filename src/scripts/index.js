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
});