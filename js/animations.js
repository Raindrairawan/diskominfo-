// Animations and Transitions
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Page Loading Animation
  const loader = document.getElementById('loader');
  if (loader) {
    // Add a slight delay to show the loader animation
    setTimeout(() => {
      loader.classList.add('fade-out');
      document.body.classList.remove('no-scroll');
      
      // Remove loader from DOM after animation completes
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 800);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Add a smooth scroll animation
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: 'smooth'
        });
        
        // Update URL hash without scrolling
        history.pushState(null, null, targetId);
      }
    });
  });

  // Animate counter numbers (for statistics section)
  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16); // Update every 16ms (60fps)
    const timer = setInterval(() => {
      start += increment;
      element.textContent = Math.floor(start);
      
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  };

  // Initialize counters when they come into view
  const initCounters = () => {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      
      // Use Intersection Observer to trigger counter when visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(counter, target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(counter);
    });
  };

  // Initialize counters if they exist on the page
  if (document.querySelector('.counter-number')) {
    initCounters();
  }

  // Animate services cards on hover
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('card-hover');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('card-hover');
    });
  });

  // Animate team member cards on hover
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('.team-social').classList.add('show');
    });
    
    card.addEventListener('mouseleave', () => {
      card.querySelector('.team-social').classList.remove('show');
    });
  });

  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const parallaxElements = heroSection.querySelectorAll('.parallax');
      
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    });
  }

  // Animate progress bars
  const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      
      // Use Intersection Observer to trigger animation when visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            bar.style.width = targetWidth;
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(bar);
    });
  };

  // Initialize progress bars if they exist on the page
  if (document.querySelector('.progress-bar')) {
    animateProgressBars();
  }

  // Animate elements on scroll (fallback for browsers that don't support AOS)
  if (!window.AOS) {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Check on initial load
  }
});