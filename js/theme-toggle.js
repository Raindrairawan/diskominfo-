// Theme Toggle Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Add event listener to theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

// Initialize theme based on user preference or system preference
function initTheme() {
    // Check if user has previously selected a theme
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Check system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersDarkScheme.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        }
    }
}

// Toggle between light and dark themes
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Update theme attribute
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    updateThemeIcon(newTheme);
}

// Update the theme toggle icon based on current theme
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Clear existing icon
        themeToggle.innerHTML = '';
        
        // Add appropriate icon
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('title', 'Switch to Light Mode');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('title', 'Switch to Dark Mode');
        }
    }
}