// Fade each SOUNDINGS image in as it finishes loading
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.soundings-item img').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });
});
