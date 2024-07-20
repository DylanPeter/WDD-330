document.addEventListener('DOMContentLoaded', () => {
    // Toggle Light/Dark Mode
    const toggleThemeButton = document.getElementById('toggle-theme');
    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Profile Form
    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        alert('Profile updated successfully!');
    });

    // Load profile info from localStorage
    document.getElementById('username').value = localStorage.getItem('username') || '';
    document.getElementById('email').value = localStorage.getItem('email') || '';

    // Notifications
    const notificationsCheckbox = document.getElementById('notifications');
    notificationsCheckbox.checked = localStorage.getItem('notifications') === 'true';
    notificationsCheckbox.addEventListener('change', () => {
        localStorage.setItem('notifications', notificationsCheckbox.checked);
    });
});