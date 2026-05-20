(function () {
    // Fade in on load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.7s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });

    // Intersection observer — items animate in as they scroll into view
    const items = document.querySelectorAll('.arc-item');
    items.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(22px)';
        el.style.transition = 'opacity 0.65s ease, transform 0.65s cubic-bezier(0.25, 0, 0.1, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    items.forEach((el, i) => {
        setTimeout(() => observer.observe(el), i * 40);
    });
})();
