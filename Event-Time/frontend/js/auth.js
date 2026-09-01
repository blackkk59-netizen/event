// ======================================
// Event Next Door - Shared Auth UI Script
// (used on pages like event_list.html that show
// a logged-in user's name + logout button in the nav)
// ======================================

// Handle Logout
const handleLogout = () => {
  // FIX: was calling logoutUser() — a global function that doesn't exist.
  // api.js defines this as AuthAPI.logout().
  AuthAPI.logout();
  showAlert('Logged out successfully', 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
};

// Utility Functions
const showAlert = (message, type = 'info') => {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  alertDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    border-radius: 4px;
    z-index: 9999;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    animation: slideIn 0.3s ease-in;
  `;
  document.body.appendChild(alertDiv);
  setTimeout(() => alertDiv.remove(), 3000);
};

const showLoading = (show) => {
  let loader = document.getElementById('loader');
  if (!loader && show) {
    loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      z-index: 10000;
    `;
    document.body.appendChild(loader);
  } else if (loader) {
    if (show) loader.style.display = 'block';
    else loader.style.display = 'none';
  }
};

// Check if user is logged in
// FIX: previously called bare isAuthenticated()/getCurrentUser() at the top
// level of the script, which run before AuthAPI even exists if script
// ordering changes, and which don't exist as globals at all — they're
// AuthAPI.isAuthenticated() / AuthAPI.getCurrentUser(). Wrapped in
// DOMContentLoaded so it reliably runs after api.js has loaded and the
// userNav element exists in the DOM.
document.addEventListener('DOMContentLoaded', () => {
  if (AuthAPI.isAuthenticated()) {
    const user = AuthAPI.getCurrentUser();
    if (user) {
      const userNav = document.getElementById('userNav');
      if (userNav) {
        userNav.innerHTML = `
          <span>Welcome, ${user.fullName}!</span>
          <button onclick="handleLogout()" style="margin-left: 10px; padding: 8px 15px; background: #ff6b6b; color: white; border: none; border-radius: 4px; cursor: pointer;">Logout</button>
        `;
      }
    }
  }
});