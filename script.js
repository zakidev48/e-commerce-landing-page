// Add theme switching functionality at the top of the file
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add transition class
    document.body.classList.add('theme-transition');
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Add error handling utility
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    // You could add error reporting service here
}

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    mobileMenuBtn.innerHTML = isOpen ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        try {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        } catch (error) {
            handleError(error, 'smooth scroll');
        }
    });
});

// Add fade-in animation for elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all features and reviews
document.querySelectorAll('.feature, .review').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Add click animation to CTA button
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
});

// Add rotation animation for feature icons
document.querySelectorAll('.feature-icon').forEach(icon => {
    icon.style.transition = 'transform 0.5s ease';
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'rotate(360deg)';
    });
    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'rotate(0)';
    });
});

// Add sparkle effect to stars
document.querySelectorAll('.stars').forEach(starsContainer => {
    starsContainer.addEventListener('mouseover', () => {
        starsContainer.querySelectorAll('.fa-star').forEach((star, index) => {
            setTimeout(() => {
                star.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    star.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    });
});

// Add to cart functionality
document.querySelectorAll('.product-button').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product-info');
        const productName = product.querySelector('h3').textContent;
        
        // Add animation
        this.innerHTML = '✓ Added!';
        this.style.backgroundColor = 'var(--accent-color)';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            this.innerHTML = 'Add to Cart';
            this.style.backgroundColor = '';
        }, 2000);
        
        // You can add actual cart functionality here
        console.log(`Added ${productName} to cart`);
    });
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 500);
    
    // Apply typing effect on load
    const heroTitle = document.querySelector('.hero-content h1');
    const originalText = heroTitle.textContent;
    typeEffect(heroTitle, originalText);
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const button = e.target.querySelector('button');
    
    try {
        // Show loading state
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Success state
        button.innerHTML = '✓ Subscribed!';
        button.style.backgroundColor = 'var(--accent-color)';
        e.target.reset();
    } catch (error) {
        handleError(error, 'newsletter submission');
        button.innerHTML = 'Error! Try again';
        button.style.backgroundColor = '#dc2626';
    } finally {
        // Reset button after delay
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = 'Subscribe';
            button.style.backgroundColor = '';
        }, 2000);
    }
});

// Add nav hide/show on scroll
let lastScroll = 0;
const nav = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 70) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Initialize Fancybox
try {
    Fancybox.bind("[data-fancybox]", {
        // Custom options
        Carousel: {
            infinite: false
        }
    });
} catch (error) {
    handleError(error, 'Fancybox initialization');
}

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Add typing effect to hero title
function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}
