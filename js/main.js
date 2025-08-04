// Main JavaScript for DISKOMINFO Kabupaten Siak Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading animation
    initLoading();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize FAQ accordions
    initFaqAccordions();
    
    // Initialize Three.js globe if element exists
    if (document.getElementById('globe')) {
        initGlobe();
    }
});

// Loading Animation
function initLoading() {
    // Create loading animation element
    const loadingAnimation = document.createElement('div');
    loadingAnimation.className = 'loading-animation';
    loadingAnimation.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingAnimation);
    
    // Hide loading animation after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingAnimation.classList.add('hidden');
            setTimeout(function() {
                loadingAnimation.remove();
            }, 500);
        }, 500);
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Change icon based on menu state
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
}

// FAQ Accordions
function initFaqAccordions() {
    const faqButtons = document.querySelectorAll('.faq-button');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle current FAQ
            answer.classList.toggle('hidden');
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
            
            // Optional: Close other FAQs
            // faqButtons.forEach(otherButton => {
            //     if (otherButton !== button) {
            //         const otherAnswer = otherButton.nextElementSibling;
            //         const otherIcon = otherButton.querySelector('i');
            //         
            //         otherAnswer.classList.add('hidden');
            //         if (otherIcon) {
            //             otherIcon.classList.remove('rotate-180');
            //         }
            //     }
            // });
        });
    });
}

// Three.js Globe (if Three.js is included)
function initGlobe() {
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        console.warn('Three.js is not loaded. Globe will not be initialized.');
        return;
    }
    
    // Globe container
    const container = document.getElementById('globe');
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 200;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create globe geometry
    const globeGeometry = new THREE.SphereGeometry(100, 64, 64);
    
    // Create globe material
    const globeMaterial = new THREE.MeshBasicMaterial({
        color: 0x16a085,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    
    // Create globe mesh
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    
    // Create atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(105, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x16a085,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate globe
        globe.rotation.y += 0.002;
        atmosphere.rotation.y += 0.001;
        
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(newWidth, newHeight);
    });
}

// Scroll animations
window.addEventListener('scroll', function() {
    // Add scroll-based animations here if needed
    // For example, parallax effects or revealing elements on scroll
    
    // Navbar background change on scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-primary');
            navbar.classList.remove('bg-primary/90', 'backdrop-blur-sm');
        } else {
            navbar.classList.remove('bg-primary');
            navbar.classList.add('bg-primary/90', 'backdrop-blur-sm');
        }
    }
});

// Form validation for contact form
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('input[type="text"], input[type="email"], textarea');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
            } else {
                field.classList.remove('border-red-500');
            }
        });
        
        if (isValid) {
            // Show success message
            alert('Pesan Anda telah terkirim. Terima kasih telah menghubungi kami!');
            contactForm.reset();
        } else {
            // Show error message
            alert('Mohon lengkapi semua field yang diperlukan.');
        }
    });
}