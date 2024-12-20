document.addEventListener('DOMContentLoaded', () => {
    // Modal functionality
    const loginBtn = document.querySelector('.login-btn');
    const loginModal = document.getElementById('login-modal');
    const modalContent = document.querySelector('.modal-content');

    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });

    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });

    // Search functionality
    const searchBar = document.querySelector('.search-bar');
    const couponCards = document.querySelectorAll('.coupon-card');

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        couponCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.dataset.category.toLowerCase();
            const matches = title.includes(searchTerm) || category.includes(searchTerm);
            
            if (matches) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            couponCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Form submissions with enhanced feedback
    const loginForm = document.querySelector('.login-form');
    const contactForm = document.querySelector('.contact-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Simulate login with loading state
        const submitBtn = loginForm.querySelector('.submit-btn');
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;

        setTimeout(() => {
            console.log('Login attempt:', { email, password });
            showNotification('Login successful! (This is a demo)');
            loginModal.classList.remove('active');
            loginForm.reset();
            submitBtn.textContent = 'Login';
            submitBtn.disabled = false;
        }, 1500);
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simulate form submission with loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            console.log('Contact form submission:', { name, email, message });
            showNotification('Message sent successfully! (This is a demo)');
            contactForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, 1500);
    });

    // Enhanced buy button functionality
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.coupon-card');
            const couponName = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => button.style.transform = 'scale(1)', 200);

            // Show purchase confirmation
            showNotification(`Processing payment for ${couponName} at ${price} (This is a demo)`);
        });
    });

    // Smooth scrolling with progress indication
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Remove active class from all links
                document.querySelectorAll('a[href^="#"]').forEach(a => a.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: var(--border-radius);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 1000;
            transform: translateY(100px);
            transition: transform 0.3s ease;
        `;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.style.transform = 'translateY(0)', 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add animation to coupon cards when they come into view
    const observeElements = (elements) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px) rotateX(5deg)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    };

    // Observe coupon cards and sections for animation
    observeElements(document.querySelectorAll('.coupon-card'));
    observeElements(document.querySelectorAll('.section h2'));
});