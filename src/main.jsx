import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './i18n';

const enableLazyLoading = () => {
  document.querySelectorAll('img').forEach((img) => {
    if (!img.hasAttribute('loading')) {
      img.loading = 'lazy';
    }

    if (!img.hasAttribute('decoding')) {
      img.decoding = 'async';
    }
  });
};

const observer = new MutationObserver(() => {
  enableLazyLoading();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

enableLazyLoading();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);