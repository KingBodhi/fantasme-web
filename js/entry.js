(function () {
    /* ——— CUSTOM CURSOR ——— */
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);

    let mx = -200, my = -200;
    let ringX = -200, ringY = -200;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
    });

    function updateRing() {
        ringX += (mx - ringX) * 0.1;
        ringY += (my - ringY) * 0.1;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(updateRing);
    }
    updateRing();

    /* ——— PORTAL PROXIMITY — brightness builds as cursor approaches ——— */
    const portal = document.getElementById('portal');
    const portalWrap = document.getElementById('portal-wrap');

    document.addEventListener('mousemove', e => {
        if (!portal) return;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
        // Full effect starts at 280px, peaks at ~80px
        const t = Math.max(0, Math.min(1, (280 - dist) / 200));
        const ease = t * t * (3 - 2 * t); // smoothstep
        portal.style.filter = `brightness(${1 + ease * 0.35}) saturate(${1 + ease * 0.18})`;
    });

    /* ——— RING HOVER STATES ——— */
    if (portalWrap) {
        portalWrap.addEventListener('mouseenter', () => {
            ring.style.width = '64px';
            ring.style.height = '64px';
            ring.style.borderColor = 'rgba(175, 120, 255, 0.38)';
        });
        portalWrap.addEventListener('mouseleave', () => {
            ring.style.width = '26px';
            ring.style.height = '26px';
            ring.style.borderColor = 'rgba(255, 255, 255, 0.18)';
        });
    }

    // Green orb hover
    const greenLink = document.getElementById('green-orb-link');
    if (greenLink) {
        greenLink.addEventListener('mouseenter', () => {
            ring.style.width = '52px';
            ring.style.height = '52px';
            ring.style.borderColor = 'rgba(80, 220, 110, 0.4)';
        });
        greenLink.addEventListener('mouseleave', () => {
            ring.style.width = '26px';
            ring.style.height = '26px';
            ring.style.borderColor = 'rgba(255, 255, 255, 0.18)';
        });
        greenLink.addEventListener('click', e => {
            e.preventDefault();
            document.body.style.transition = 'opacity 0.7s ease';
            document.body.style.opacity = '0';
            setTimeout(() => { window.location.href = greenLink.getAttribute('href'); }, 700);
        });
    }

    const enterLink = document.getElementById('enter-link');
    if (enterLink) {
        enterLink.addEventListener('mouseenter', () => {
            ring.style.width = '44px';
            ring.style.height = '44px';
            ring.style.borderColor = 'rgba(255, 255, 255, 0.38)';
        });
        enterLink.addEventListener('mouseleave', () => {
            ring.style.width = '26px';
            ring.style.height = '26px';
            ring.style.borderColor = 'rgba(255, 255, 255, 0.18)';
        });

        enterLink.addEventListener('click', e => {
            e.preventDefault();
            const dest = enterLink.getAttribute('href');
            document.body.style.transition = 'opacity 0.9s ease';
            document.body.style.opacity = '0';
            setTimeout(() => { window.location.href = dest; }, 900);
        });
    }
})();
