// Main JavaScript for Unearthed Exhibition Website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    loadDocumentation();
    initializeZoneInteractions();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Animation system
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Add animation classes to elements
    addAnimationClasses();
}

function addAnimationClasses() {
    // Add fade-in to section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => header.classList.add('fade-in'));

    // Add slide-in animations to content
    const experienceContent = document.querySelector('.experience-content');
    const zonesContainer = document.querySelector('.zones-container');
    
    if (experienceContent) experienceContent.classList.add('slide-in-left');
    if (zonesContainer) zonesContainer.classList.add('slide-in-right');

    // Add fade-in to stats and contact items
    const statItems = document.querySelectorAll('.stat-item');
    const contactItems = document.querySelectorAll('.contact-item');
    
    statItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    contactItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.2}s`;
    });
}

// Zone interactions
function initializeZoneInteractions() {
    const zoneItems = document.querySelectorAll('.zone-item');
    
    zoneItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const zone = this.getAttribute('data-zone');
            this.style.transform = 'translateX(15px) scale(1.02)';
            
            // Add glow effect to indicator
            const indicator = this.querySelector('.zone-indicator');
            indicator.style.boxShadow = '0 0 20px currentColor';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const indicator = this.querySelector('.zone-indicator');
            indicator.style.boxShadow = '';
        });

        // Click handler for future expansion
        item.addEventListener('click', function() {
            const zone = this.getAttribute('data-zone');
            console.log(`Clicked on zone: ${zone}`);
            // Future: Open detailed zone information
        });
    });
}

// Documentation loading
async function loadDocumentation() {
    const docsContainer = document.getElementById('docs-container');
    
    // Documentation data (in a real app, this would come from your markdown files)
    const docs = [
        {
            title: "Project Overview & Strategy",
            excerpt: "Comprehensive project vision, objectives, and strategic framework for the Unearthed Exhibition.",
            slug: "01-project-overview-strategy"
        },
        {
            title: "Exhibition Narrative & Experience Design",
            excerpt: "Multi-story immersive underground universe concept and environmental storytelling.",
            slug: "09-exhibition-narrative-experience-design"
        },
        {
            title: "Financial Model & Budget Planning",
            excerpt: "Financial projections, revenue models, and budget allocations for the exhibition.",
            slug: "02-financial-model-budget-planning"
        },
        {
            title: "Marketing & PR Strategy",
            excerpt: "Brand positioning, promotional campaigns, and media outreach strategies.",
            slug: "07-marketing-pr-strategy"
        },
        {
            title: "Exhibition Design & Curation",
            excerpt: "Display concepts, specimen selection, and visitor experience design.",
            slug: "05-exhibition-design-curation"
        },
        {
            title: "Sponsorship Strategy & Outreach",
            excerpt: "Corporate partnerships, funding strategies, and sponsor relationships.",
            slug: "03-sponsorship-strategy-outreach"
        }
    ];

    // Create documentation items
    docs.forEach((doc, index) => {
        const docElement = createDocumentationItem(doc, index);
        docsContainer.appendChild(docElement);
    });
}

function createDocumentationItem(doc, index) {
    const docItem = document.createElement('div');
    docItem.className = 'doc-item fade-in';
    docItem.style.transitionDelay = `${index * 0.1}s`;
    
    docItem.innerHTML = `
        <h3 class="doc-title">${doc.title}</h3>
        <p class="doc-excerpt">${doc.excerpt}</p>
    `;

    // Click handler to view documentation
    docItem.addEventListener('click', function() {
        viewDocumentation(doc);
    });

    return docItem;
}

function viewDocumentation(doc) {
    // For now, just log. In the future, this could open a modal or navigate to a page
    console.log(`Viewing documentation: ${doc.title}`);
    
    // Future implementation could:
    // 1. Open a modal with the full markdown content
    // 2. Navigate to a dedicated page
    // 3. Load content dynamically
    
    alert(`Documentation viewer coming soon!\n\nSelected: ${doc.title}\n\n${doc.excerpt}`);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll effects
window.addEventListener('scroll', debounce(function() {
    const scrolled = window.scrollY;
    const parallax = document.querySelector('.hero-background');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 10));

// Hero title typing effect (optional enhancement)
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title .title-line');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Initialize typing effect on load (commented out by default)
// document.addEventListener('DOMContentLoaded', initializeTypingEffect);

// Smooth reveal animations for stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        const suffix = finalValue.replace(/\d/g, '');
        
        if (isNaN(numericValue)) return;
        
        let currentValue = 0;
        const increment = numericValue / 60; // 60 frames for 1 second animation
        
        const counter = () => {
            currentValue += increment;
            if (currentValue < numericValue) {
                stat.textContent = Math.floor(currentValue) + suffix;
                requestAnimationFrame(counter);
            } else {
                stat.textContent = finalValue;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });
}

// Initialize stats animation
document.addEventListener('DOMContentLoaded', animateStats);

// Export functions for potential external use
window.UnearthedApp = {
    loadDocumentation,
    viewDocumentation,
    animateStats,
    initializeTypingEffect
};
