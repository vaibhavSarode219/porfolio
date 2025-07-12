// Theme Management
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme on page load
if (currentTheme === 'light') {
    body.setAttribute('data-theme', 'light');
    themeIcon.className = 'fas fa-moon';
} else {
    body.removeAttribute('data-theme');
    themeIcon.className = 'fas fa-sun';
}

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Close mobile menu when clicking on nav links
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
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

// Initialize typing effect with developer-style text
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    if (!typingElement) return;
    
    const roles = [
        'Full-Stack Developer',
        'Angular Developer',
        'React.js Specialist', 
        'Node.js Expert',
        'Problem Solver'
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function typeWriter() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 75;
        } else {
            typingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 150;
        }
        
        // Add cursor effect
        typingElement.innerHTML = typingElement.textContent + '<span class="cursor">|</span>';
        
        if (!isDeleting && currentCharIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next role
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(typeWriter, 1000);
}

// Developer command functions
function downloadResume() {
    // Simulate terminal-style download
    const btn = event.target.closest('.neon-btn');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<span>$ downloading...</span><i class="fas fa-spinner fa-spin"></i>';
    
    setTimeout(() => {
        btn.innerHTML = '<span>$ download complete ✓</span><i class="fas fa-check"></i>';
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
            // In real implementation, this would trigger actual download
            alert('Resume download started! 📄');
        }, 1500);
    }, 2000);
}

function openGitHub() {
    const btn = event.target.closest('.neon-btn');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<span>$ connecting to github...</span><i class="fas fa-spinner fa-spin"></i>';
    
    setTimeout(() => {
        btn.innerHTML = '<span>$ repository opened ✓</span><i class="fas fa-external-link-alt"></i>';
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
            // In real implementation, this would open GitHub
            window.open('https://github.com', '_blank');
        }, 1500);
    }, 1500);
}

// Enhanced project card interactions
function initializeProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add click to expand functionality
        card.addEventListener('click', function(e) {
            if (e.target.closest('.project-link')) return;
            
            // Toggle expanded state
            this.classList.toggle('expanded');
            
            // Add terminal-style selection effect
            if (this.classList.contains('expanded')) {
                this.style.transform = 'translateY(-12px) scale(1.03)';
                this.style.zIndex = '10';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.zIndex = '1';
            }
        });
        
        // Add code preview hover effect
        const codePreview = card.querySelector('.project-code-preview');
        if (codePreview) {
            codePreview.addEventListener('mouseenter', function() {
                this.style.background = 'hsl(220, 13%, 4%)';
                this.style.borderColor = 'var(--primary-color)';
            });
            
            codePreview.addEventListener('mouseleave', function() {
                this.style.background = 'hsl(220, 13%, 6%)';
                this.style.borderColor = 'var(--border-color)';
            });
        }
    });
}

// Matrix-style background effect for skills section
function initializeMatrixEffect() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0.1';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    skillsSection.style.position = 'relative';
    skillsSection.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = skillsSection.offsetWidth;
    canvas.height = skillsSection.offsetHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const drops = [];
    
    for (let x = 0; x < canvas.width / 10; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(34, 34, 34, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f3460';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * 10, drops[i] * 10);
            
            if (drops[i] * 10 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Message sent successfully! I\'ll get back to you soon.');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Initialize project cards hover effects
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize skill badges hover effects
function initializeSkillBadges() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing effect
    initializeTypingEffect();
    
    // Initialize project interactions
    initializeProjectInteractions();
    
    // Initialize skill badges
    initializeSkillBadges();
    
    // Initialize matrix effect
    initializeMatrixEffect();
    
    // Event listeners
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu toggle
    document.querySelector('.nav-toggle').addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
    
    // Scroll event listeners (throttled for performance)
    const throttledScrollHandler = throttle(() => {
        updateActiveNavLink();
    }, 10);
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Window resize handler
    window.addEventListener('resize', throttle(() => {
        // Handle responsive updates
        if (window.innerWidth > 768) {
            document.querySelector('.nav-menu').classList.remove('active');
            document.querySelector('.nav-toggle').classList.remove('active');
        }
    }, 250));
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for skill badges
                if (entry.target.classList.contains('skill-badge')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const elementsToObserve = document.querySelectorAll(`
        .project-card, 
        .skill-badge, 
        .timeline-item, 
        .stat,
        .about-text,
        .contact-item
    `);
    
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add button ripple effects
document.addEventListener('DOMContentLoaded', function() {
    // Add click effect to buttons
    document.querySelectorAll('.neon-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add theme toggle animation
    themeToggle.addEventListener('click', function() {
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 300);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Toggle theme with Ctrl/Cmd + Shift + T
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Add smooth page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
