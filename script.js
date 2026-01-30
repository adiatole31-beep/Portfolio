document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------
       Theme Toggle Logic
    ----------------------------------------------- */
    const themeToggle = document.querySelector('.theme-toggle');
    const toggleIcon = themeToggle.querySelector('i');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update Icon
        if (theme === 'dark') {
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
        } else {
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
        }
    }

    /* -----------------------------------------------
       Mobile Menu Logic
    ----------------------------------------------- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    /* -----------------------------------------------
       Smooth Scroll Functionality
    ----------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed header offset
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
/* -----------------------------------------------
   Profile Image 3D Tilt Effect
----------------------------------------------- */
const profileWrapper = document.querySelector('.profile-wrapper');
const profilePic = document.querySelector('.profile-pic');

if (profileWrapper && profilePic) {
    profileWrapper.addEventListener('mousemove', (e) => {
        const rect = profileWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 8;
        const rotateY = ((x - centerX) / centerX) * 8;

        profilePic.style.transform = `
            rotateX(${-rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;
    });

    profileWrapper.addEventListener('mouseleave', () => {
        profilePic.style.transform = `
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;
    });
}

/* -----------------------------------------------
   Scroll Animations (Intersection Observer)
----------------------------------------------- */
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Automatically add reveal classes to items
document.querySelectorAll('.skill-card').forEach(el => el.classList.add('reveal-scale'));
document.querySelectorAll('.timeline-item').forEach(el => el.classList.add('reveal-left'));

// Add stagger class to parent containers
document.querySelectorAll('.skill-grid, .project-grid, .timeline, .about-cards').forEach(el => {
    el.classList.add('stagger-items');
});

// Observe all reveal types
document.querySelectorAll('.reveal, .reveal-item, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-contact-info, .reveal-contact-form, .reveal-edu-card, .reveal-project-card, .reveal-bento').forEach(el => {
    observer.observe(el);
});




/* -----------------------------------------------
   Contact Form Handling
----------------------------------------------- */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

        // Let the form submit normally (don't prevent default)
        // FormSubmit will handle the redirect
    });
}
