const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const themeButton = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeLabel = document.querySelector('.theme-label');
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  if (themeButton) {
    themeButton.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    themeButton.title = `Switch to ${nextTheme} mode`;
  }
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  if (themeLabel) themeLabel.textContent = nextTheme.toUpperCase();
  if (themeColor) themeColor.content = theme === 'dark' ? '#101511' : '#f4f6f2';
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem('portfolio-theme');
} catch {
  // The theme still works for this session if browser storage is unavailable.
}
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
applyTheme(savedTheme || preferredTheme);

if (themeButton) {
  themeButton.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch {
      // Keep the selected theme for the current page session.
    }
    applyTheme(nextTheme);
  });
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
    }
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
