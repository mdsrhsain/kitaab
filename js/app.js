document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor tracking
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    // Check if cursor exists (disabled on mobile)
    if(cursorDot && cursorOutline && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Adding a slight delay for the outline ring
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, {duration: 500, fill: "forwards", easing: "ease-out"});
        });
        
        // Hover effects
        const hoverTargets = document.querySelectorAll('.hover-target');
        
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(226, 183, 64, 0.1)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            target.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // Scroll Navbar Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3D Tilt Effect on Cards
    const tiltCards = document.querySelectorAll('.hover-tilt');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'all 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealFunction = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Trigger on load and scroll
    window.addEventListener('scroll', revealFunction);
    revealFunction();
    
    // Form Submission (Mock)
    const requestForm = document.getElementById('requestForm');
    if(requestForm) {
        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = requestForm.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Sent Successfully <span class="ur-text btn-ur" dir="rtl">رسید موصول</span>';
            btn.style.background = '#4caf50';
            btn.style.color = 'white';
            
            setTimeout(() => {
                requestForm.reset();
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 3000);
        });
    }
});
