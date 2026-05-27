(function () {
    // Sticky nav
    const nav = document.getElementById('nav');
    const onScroll = () => {
        nav.classList.toggle('stuck', window.scrollY > 50);
        nav.classList.toggle('reveal-mode', window.scrollY < window.innerHeight * 0.88);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger / mobile drawer
    const hamburger = document.getElementById('nav-hamburger');
    const mobileNav  = document.getElementById('nav-mobile');
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            const open = hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open', open);
            hamburger.setAttribute('aria-expanded', open);
            mobileNav.setAttribute('aria-hidden', !open);
        });
        // Close drawer when a link inside it is tapped
        mobileNav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                mobileNav.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // Hero parallax — rAF-throttled so it never runs more than once per frame
    const heroContent = document.querySelector('.hero-content');
    const heroAtmos = document.querySelector('.hero-atmosphere');
    if (heroContent) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const y = window.scrollY;
                    heroContent.style.transform = `translateY(${y * 0.28}px)`;
                    heroContent.style.opacity = Math.max(0, 1 - y / 480);
                    if (heroAtmos) heroAtmos.style.transform = `translateY(${y * 0.12}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // Make body instantly visible — the veil covers any flash
    document.body.style.opacity = '1';

    // Veil fades out, revealing the page smoothly from the entry white-out
    const veil = document.getElementById('entry-veil');
    const hero = document.querySelector('.hero-content');
    if (veil) {
        veil.style.transition = 'opacity 0.7s ease';
        if (hero) {
            hero.style.transform  = 'scale(1.05)';
            hero.style.transition = 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        requestAnimationFrame(() => requestAnimationFrame(() => {
            veil.style.opacity = '0';
            if (hero) hero.style.transform = 'scale(1)';
        }));
        setTimeout(() => veil.remove(), 800);
    }

    // 3D title tilt — sinusoidal idle drift + mouse-reactive on desktop
    const heroTitle = document.querySelector('.hero-title');
    const heroSection = document.querySelector('.hero');
    if (heroTitle && heroSection && !window.matchMedia('(hover: none)').matches) {
        let tx = 0, ty = 0, targetX = 0, targetY = 0, mouseActive = false;

        heroSection.addEventListener('mousemove', e => {
            mouseActive = true;
            const r = heroSection.getBoundingClientRect();
            const cx = (e.clientX - r.left) / r.width  - 0.5;
            const cy = (e.clientY - r.top)  / r.height - 0.5;
            targetX = cy * -8;
            targetY = cx *  12;
        });

        heroSection.addEventListener('mouseleave', () => {
            mouseActive = false;
            targetX = 0;
            targetY = 0;
        });

        (function tilt() {
            const t = performance.now() * 0.001;
            if (mouseActive) {
                tx += (targetX - tx) * 0.07;
                ty += (targetY - ty) * 0.07;
            } else {
                const ix = Math.sin(t * 0.38) * 2.8;
                const iy = Math.cos(t * 0.27) * 4.0;
                tx += (ix - tx) * 0.025;
                ty += (iy - ty) * 0.025;
            }
            heroTitle.style.transform =
                `perspective(900px) rotateX(${tx.toFixed(3)}deg) rotateY(${ty.toFixed(3)}deg)`;
            requestAnimationFrame(tilt);
        })();
    }

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
