// Select the toggle checkbox
const themeToggle = document.getElementById('theme-toggle');

// Listen for toggle changes
themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('light-theme');
});
