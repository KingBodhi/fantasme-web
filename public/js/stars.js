/**
 * Star field, shooting stars, and gravity particles.
 * Entry page: full-screen canvas with particles pulled toward portal center.
 * Home page: hero-scoped canvas, no particles.
 */
(function () {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const isEntry = canvas.closest('.hero') === null;

    let stars = [];
    let shootingStars = [];
    let particles = [];
    let nextShootTime = 0;

    /* ——— RESIZE ——— */
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generateStars();
        if (isEntry) generateParticles();
    }

    /* ——— STAR FIELD ——— */
    function generateStars() {
        stars = [];
        const density = isEntry ? 3800 : 5500;
        const count = Math.floor((canvas.width * canvas.height) / density);
        for (let i = 0; i < count; i++) {
            const bright = Math.random() < 0.12;
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: bright
                    ? Math.random() * 1.6 + 0.7
                    : Math.random() * 0.85 + 0.12,
                alpha: Math.random() * 0.65 + 0.12,
                speed: Math.random() * 0.0038 + 0.0009,
                phase: Math.random() * Math.PI * 2,
                color: Math.random() < 0.13
                    ? 'rgba(195, 175, 255,'
                    : Math.random() < 0.09
                        ? 'rgba(175, 210, 255,'
                        : 'rgba(255, 255, 255,'
            });
        }
    }

    function drawStars(t) {
        for (const s of stars) {
            const a = s.alpha * (0.52 + 0.48 * Math.sin(t * s.speed + s.phase));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `${s.color}${a})`;
            ctx.fill();
        }
    }

    /* ——— SHOOTING STARS ——— */
    function spawnShooting() {
        const bright = Math.random() < 0.22;
        const speed = 6 + Math.random() * 7;

        // Angle: 20°–75° below horizontal, random left or right
        const minA = Math.PI / 9;   // 20°
        const maxA = Math.PI * 5 / 12; // 75°
        const angle = minA + Math.random() * (maxA - minA);
        const dir = Math.random() > 0.45 ? 1 : -1;

        const vx = Math.cos(angle) * speed * dir;
        const vy = Math.sin(angle) * speed;

        // Start off-screen edge
        const sx = dir > 0
            ? -120 + Math.random() * canvas.width * 0.2
            : canvas.width * 0.8 + Math.random() * canvas.width * 0.2 + 120;
        const sy = -20 + Math.random() * canvas.height * 0.55;

        shootingStars.push({
            x: sx, y: sy,
            vx, vy,
            trailLen: 100 + Math.random() * 100,
            life: 0,
            maxLife: 65 + Math.random() * 55,
            width: bright ? 1.6 + Math.random() * 0.8 : 0.9 + Math.random() * 0.7,
            bright,
            done: false
        });
    }

    function drawShootingStars() {
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const s = shootingStars[i];
            s.life++;

            // Smooth in/out alpha via sine curve
            const progress = s.life / s.maxLife;
            const alpha = Math.sin(Math.PI * progress);

            // Head = current pos, tail extends back along velocity
            const spd = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
            const nx = s.vx / spd;
            const ny = s.vy / spd;
            const tx = s.x - nx * s.trailLen;
            const ty = s.y - ny * s.trailLen;

            const maxA = s.bright ? 0.95 : 0.82;
            const grad = ctx.createLinearGradient(s.x, s.y, tx, ty);
            grad.addColorStop(0,   `rgba(255, 255, 255, ${alpha * maxA})`);
            grad.addColorStop(0.25, `rgba(210, 185, 255, ${alpha * 0.55})`);
            grad.addColorStop(0.6,  `rgba(160, 120, 240, ${alpha * 0.2})`);
            grad.addColorStop(1,    'rgba(130, 90, 220, 0)');

            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(s.x, s.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = s.width;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Bright stars get a soft head glow
            if (s.bright && alpha > 0.3) {
                const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 5);
                glow.addColorStop(0, `rgba(255, 245, 255, ${alpha * 0.6})`);
                glow.addColorStop(1, 'rgba(200, 160, 255, 0)');
                ctx.beginPath();
                ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = glow;
                ctx.fill();
            }

            s.x += s.vx;
            s.y += s.vy;

            if (s.life >= s.maxLife) shootingStars.splice(i, 1);
        }
    }

    /* ——— GRAVITY PARTICLES (entry page only) ——— */
    // Subtle debris pulled toward the portal center
    function generateParticles() {
        particles = [];
        for (let i = 0; i < 22; i++) {
            particles.push(makeParticle(true));
        }
    }

    function makeParticle(scatter) {
        const angle = Math.random() * Math.PI * 2;
        const minR = Math.max(canvas.width, canvas.height) * 0.32;
        const maxR = Math.max(canvas.width, canvas.height) * 0.62;
        const dist = scatter
            ? minR + Math.random() * (maxR - minR)
            : maxR * (0.85 + Math.random() * 0.3);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        return {
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * dist,
            r: 0.35 + Math.random() * 0.85,
            speed: 0.1 + Math.random() * 0.18,
            alpha: 0,
            maxAlpha: 0.1 + Math.random() * 0.15,
        };
    }

    function drawParticles() {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const FADE_IN_DIST = 80;   // start fading in when this far from spawn ring
        const FADE_OUT_DIST = 145; // start fading out when this close to center

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const dx = cx - p.x;
            const dy = cy - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // If reached center, recycle
            if (dist < 35) {
                particles[i] = makeParticle(false);
                continue;
            }

            // Move toward center, accelerate slightly
            const nx = dx / dist;
            const ny = dy / dist;
            p.speed = Math.min(p.speed * 1.004, 0.65);
            p.x += nx * p.speed;
            p.y += ny * p.speed;

            // Alpha: fade out near center, fade in from edge
            const spawnDist = Math.max(canvas.width, canvas.height) * 0.62;
            if (dist > spawnDist - FADE_IN_DIST) {
                p.alpha = Math.min(p.maxAlpha, p.alpha + 0.003);
            } else if (dist < FADE_OUT_DIST) {
                p.alpha = Math.max(0, p.alpha - 0.006);
            } else {
                p.alpha = Math.min(p.maxAlpha, p.alpha + 0.002);
            }

            if (p.alpha <= 0) continue;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(190, 155, 255, ${p.alpha})`;
            ctx.fill();
        }
    }

    /* ——— MAIN DRAW LOOP ——— */
    function draw(t) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawStars(t);

        if (isEntry) drawParticles();

        // Spawn shooting stars: up to 3 active, check ~every frame
        if (t > nextShootTime && shootingStars.length < 3) {
            spawnShooting();
            // Stagger: 1.5–4s between spawns, shorter if field is empty
            nextShootTime = t + (shootingStars.length === 0 ? 800 : 1500) + Math.random() * 2500;
        }
        drawShootingStars();
    }

    /* ——— PAGE VISIBILITY — pause loop when tab is hidden ——— */
    let animId;
    let paused = false;

    function loop(t) {
        if (!paused) draw(t);
        animId = requestAnimationFrame(loop);
    }

    document.addEventListener('visibilitychange', () => {
        paused = document.hidden;
    });

    /* ——— DEBOUNCED RESIZE ——— */
    let resizeTimer;
    function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    }

    resize();
    window.addEventListener('resize', onResize);
    animId = requestAnimationFrame(loop);
})();
