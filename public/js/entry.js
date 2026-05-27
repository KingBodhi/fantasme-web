(function () {
    const isTouch       = window.matchMedia('(hover: none)').matches;
    const video         = document.getElementById('door-video');
    const whiteOut      = document.getElementById('white-out');
    const portalPreview = document.getElementById('portal-preview');

    // ── FADE IN ──────────────────────────────────────────────────────
    requestAnimationFrame(() => {
        requestAnimationFrame(() => { document.body.classList.add('ready'); });
    });

    // ── ENTER ────────────────────────────────────────────────────────
    let playing   = false;
    let navigated = false;

    function goHome() {
        if (navigated) return;
        navigated = true;
        window.location.href = 'home.html?v=' + Date.now();
    }

    // Smooth video-time interpolation — video.currentTime steps at 25fps;
    // interpolating with performance.now() gives true 60fps animation.
    let lastVT = 0, lastPerf = 0;

    function enter() {
        if (playing) return;
        playing = true;
        lastVT   = 0;
        lastPerf = performance.now();
        document.body.classList.add('playing');
        video.currentTime  = 0;
        video.playbackRate = 2;
        video.play().catch(goHome);
    }

    video.addEventListener('timeupdate', () => {
        lastVT   = video.currentTime;
        lastPerf = performance.now();
    });

    const APPROACH_START = 3.5;
    const APPROACH_END   = 5.5;
    const RUSH_END       = 7.8;

    (function tickPortal() {
        if (playing && !navigated) {
            const t = lastVT + (performance.now() - lastPerf) * 0.001 * video.playbackRate;

            if (t < APPROACH_START) {
                portalPreview.style.opacity   = '0';
                portalPreview.style.transform = 'translate(-50%,-50%) scale(0.02)';

            } else if (t <= APPROACH_END) {
                const p = (t - APPROACH_START) / (APPROACH_END - APPROACH_START);
                const e = p * p;
                portalPreview.style.opacity   = e.toFixed(3);
                portalPreview.style.transform = `translate(-50%,-50%) scale(${(0.02 + e * 0.98).toFixed(4)})`;

            } else if (t <= RUSH_END) {
                const p = (t - APPROACH_END) / (RUSH_END - APPROACH_END);
                const e = p * p * p;
                portalPreview.style.opacity   = '1';
                portalPreview.style.transform = `translate(-50%,-50%) scale(${(1 + e * 18).toFixed(4)})`;
            }
        }
        requestAnimationFrame(tickPortal);
    })();

    // White-out + navigation
    video.addEventListener('timeupdate', () => {
        if (!playing || navigated) return;
        if (video.currentTime / (video.duration || 10) >= 0.70) {
            whiteOut.style.opacity = '1';
            setTimeout(goHome, 650);
        }
    });

    // Hard fallback
    video.addEventListener('play', () => { setTimeout(goHome, 7000); });

    document.addEventListener('click', e => {
        if (e.target.closest('.entry-nav-link')) return;
        enter();
    });

    // ── CUSTOM CURSOR — desktop only ─────────────────────────────────
    if (!isTouch) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);

        const ring = document.createElement('div');
        ring.className = 'cursor-ring';
        document.body.appendChild(ring);

        let mx = -200, my = -200;
        let ringX = -200, ringY = -200;

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            dot.style.left = mx + 'px';
            dot.style.top  = my + 'px';
        });

        (function updateRing() {
            ringX += (mx - ringX) * 0.1;
            ringY += (my - ringY) * 0.1;
            ring.style.left = ringX + 'px';
            ring.style.top  = ringY + 'px';
            requestAnimationFrame(updateRing);
        })();

        document.querySelectorAll('.entry-nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                ring.style.width       = '44px';
                ring.style.height      = '44px';
                ring.style.borderColor = 'rgba(255, 255, 255, 0.32)';
            });
            link.addEventListener('mouseleave', () => {
                ring.style.width       = '26px';
                ring.style.height      = '26px';
                ring.style.borderColor = 'rgba(255, 255, 255, 0.18)';
            });
        });
    }
})();
