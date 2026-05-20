(function () {
    // Sticky nav
    const nav = document.getElementById('nav');
    const onScroll = () => nav.classList.toggle('stuck', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Hero parallax — content drifts up gently on scroll
    const heroContent = document.querySelector('.hero-content');
    const heroAtmos = document.querySelector('.hero-atmosphere');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            heroContent.style.transform = `translateY(${y * 0.28}px)`;
            heroContent.style.opacity = Math.max(0, 1 - y / 480);
            if (heroAtmos) {
                heroAtmos.style.transform = `translateY(${y * 0.12}px)`;
            }
        }, { passive: true });
    }

    // Fade in on load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });

    // Category filtering
    const cards = document.querySelectorAll('#shop-grid .card');
    const countEl = document.getElementById('shop-count');

    document.querySelectorAll('.cat[data-filter]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            document.querySelectorAll('.cat').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            let visible = 0;
            cards.forEach(card => {
                const show = filter === 'all' || card.dataset.category === filter;
                card.style.display = show ? '' : 'none';
                if (show) visible++;
            });
            if (countEl) countEl.textContent = `${visible} Item${visible !== 1 ? 's' : ''}`;
        });
    });
})();
