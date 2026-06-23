function initializeMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  navToggle?.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-active');
    // Ensure footer visibility is controlled by CSS
  });

  // Mark the current page in the nav
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-desktop a, .menu-list a').forEach(link => {
    if (link.getAttribute('href') === here) {
      link.classList.add('current');
      link.setAttribute('aria-current', 'page');
    }
  });
} 