// Navigation and Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Handle mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
      
      // Toggle aria-expanded attribute for accessibility
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      
      // Prevent body scrolling when menu is open
      if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  });
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Change navbar background on scroll
  if (navbar) {
    const changeNavbarBackground = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };
    
    // Check on page load
    changeNavbarBackground();
    
    // Check on scroll
    window.addEventListener('scroll', changeNavbarBackground);
  }
  
  // Set active nav link based on current page
  const setActiveNavLink = () => {
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Remove active class from all links
      link.classList.remove('active');
      
      // Check if the link href matches the current path
      if (href === currentPath || 
          (currentPath.endsWith('/') && href === currentPath + 'index.html') ||
          (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('/'))) ||
          (currentPath.includes(href) && href !== '/' && href !== 'index.html')) {
        link.classList.add('active');
      }
    });
  };
  
  // Set active nav link on page load
  setActiveNavLink();
  
  // Dropdown menu functionality (if exists)
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const dropdown = toggle.nextElementSibling;
      
      // Close all other dropdowns
      dropdownToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          const otherDropdown = otherToggle.nextElementSibling;
          otherDropdown.classList.remove('show');
          otherToggle.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current dropdown
      dropdown.classList.toggle('show');
      
      // Update aria-expanded attribute
      const isExpanded = dropdown.classList.contains('show');
      toggle.setAttribute('aria-expanded', isExpanded);
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    dropdownToggles.forEach(toggle => {
      const dropdown = toggle.nextElementSibling;
      
      if (dropdown.classList.contains('show') && 
          !dropdown.contains(e.target) && 
          e.target !== toggle) {
        dropdown.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Mega menu functionality (if exists)
  const megaMenuToggles = document.querySelectorAll('.mega-menu-toggle');
  
  megaMenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const megaMenu = document.querySelector(toggle.getAttribute('data-target'));
      
      // Close all other mega menus
      document.querySelectorAll('.mega-menu').forEach(menu => {
        if (menu !== megaMenu) {
          menu.classList.remove('show');
        }
      });
      
      // Toggle current mega menu
      megaMenu.classList.toggle('show');
      
      // Update aria-expanded attribute
      const isExpanded = megaMenu.classList.contains('show');
      toggle.setAttribute('aria-expanded', isExpanded);
    });
  });
  
  // Close mega menu when clicking outside
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.mega-menu').forEach(menu => {
      const toggle = document.querySelector(`[data-target="#${menu.id}"]`);
      
      if (menu.classList.contains('show') && 
          !menu.contains(e.target) && 
          e.target !== toggle) {
        menu.classList.remove('show');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});