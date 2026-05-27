(function () {

    // ── ORB COLOR TINTS ─────────────────────────────────────────────
    const TINTS = {
        pink:   [255,  70, 155],
        green:  [ 45, 210,  85],
        purple: [105,  45, 225]
    };

    // ── PRELOAD VIDEO ────────────────────────────────────────────────
    const video = document.createElement('video');
    video.src         = 'assets/video/wormhole.mp4';
    video.muted       = true;
    video.preload     = 'auto';
    video.playsInline = true;
    video.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
    document.body.appendChild(video);
    video.load();

    let busy = false;

    // ── playOrbTransition(dest, colorKey) ────────────────────────────
    function playOrbTransition(dest, colorKey) {
        if (busy) return;
        busy = true;

        const [r, g, b] = TINTS[colorKey] || TINTS.purple;

        // ── IFRAME — destination page loads behind the canvas ────────
        const iframe = document.createElement('iframe');
        iframe.src = dest;
        iframe.style.cssText = [
            'position:fixed', 'inset:0', 'width:100%', 'height:100%',
            'border:none', 'outline:none',
            'background:#02020a',
            'z-index:9998',
            'transform:scale(0.04)',
            'transform-origin:center center',
            'will-change:transform',
            'pointer-events:none',
            'transition:none'
        ].join(';');
        document.body.appendChild(iframe);

        // ── CANVAS — starts fully transparent, cross-fades over orb ─
        // Opacity is driven entirely by canvas.style.opacity (GPU layer)
        // so the orb zoom and wormhole dissolve into each other smoothly.
        const canvas = document.createElement('canvas');
        canvas.style.cssText = [
            'position:fixed', 'inset:0',
            'z-index:9999',
            'pointer-events:all',
            'will-change:opacity',
            'opacity:0',         // starts invisible — fades in over FADE_IN ms
            'transition:none'
        ].join(';');
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let W = canvas.width  = window.innerWidth;
        let H = canvas.height = window.innerHeight;

        let raf         = null;
        let done        = false;
        let startTs     = null;
        let flyLaunched = false;

        // ── Timing (video plays at 4× = ~1.25 s total) ───────────────
        const FADE_IN    = 500;   // ms — canvas dissolves in over orb zoom
        const FLY_FRAC   = 0.62;  // fraction of video where iframe fly-in begins
        const FLY_MS     = 480;   // ms — remaining 38 % of video at 4×
        // Canvas stays opaque until the iframe nearly fills the screen,
        // then fades out quickly — no visible frame edges.
        const FADE_DELAY = 0.55;

        function coverFit() {
            const vAR = video.videoWidth / video.videoHeight;
            const cAR = W / H;
            let vw, vh, vx, vy;
            if (vAR > cAR) { vh = H; vw = H * vAR; vx = (W - vw) / 2; vy = 0; }
            else            { vw = W; vh = W / vAR;  vx = 0;           vy = (H - vh) / 2; }
            return { vx, vy, vw, vh };
        }

        function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

        // ── render loop ──────────────────────────────────────────────
        function draw(ts) {
            if (!startTs) startTs = ts;
            const elapsed = ts - startTs;
            const fadeIn  = Math.min(elapsed / FADE_IN, 1);

            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;

            // ── page fly-in trigger ───────────────────────────────────
            const vidFrac = (video.duration > 0)
                ? video.currentTime / video.duration
                : 0;

            if (!flyLaunched && vidFrac >= FLY_FRAC) {
                flyLaunched = true;
                iframe.style.transition =
                    `transform ${FLY_MS}ms cubic-bezier(0.12, 0, 0.08, 1)`;
                iframe.style.transform  = 'scale(1)';
            }

            // ── canvas CSS opacity ────────────────────────────────────
            // Ramps 0→1 at start (dissolve over orb).
            // Then 1→0 at end (reveal iframe) — but only after FADE_DELAY
            // so the iframe is near-fullscreen when canvas becomes transparent.
            let canvasOpacity = fadeIn;
            if (flyLaunched) {
                const vidRemaining = video.duration - video.currentTime;
                const flyElapsed   = (video.duration * (1 - FLY_FRAC)) - vidRemaining;
                const flyFrac2     = Math.max(0, flyElapsed / (video.duration * (1 - FLY_FRAC)));
                if (flyFrac2 > FADE_DELAY) {
                    const fadeOut = 1 - easeOut((flyFrac2 - FADE_DELAY) / (1 - FADE_DELAY));
                    canvasOpacity = Math.min(fadeIn, Math.max(fadeOut, 0));
                }
            }
            canvas.style.opacity = canvasOpacity;

            // ── draw video + colour tint (always at full internal alpha) ─
            ctx.fillStyle = '#02020a';
            ctx.fillRect(0, 0, W, H);

            if (video.readyState >= 2) {
                const { vx, vy, vw, vh } = coverFit();
                ctx.drawImage(video, vx, vy, vw, vh);

                ctx.globalCompositeOperation = 'screen';
                ctx.fillStyle = `rgba(${r},${g},${b},0.50)`;
                ctx.fillRect(0, 0, W, H);
                ctx.globalCompositeOperation = 'source-over';
            }

            if (!done) raf = requestAnimationFrame(draw);
        }

        // ── video ended ───────────────────────────────────────────────
        function onEnded() {
            if (done) return;
            done = true;
            cancelAnimationFrame(raf);
            setTimeout(() => { window.location.href = dest; }, 220);
        }

        video.addEventListener('ended', onEnded, { once: true });
        setTimeout(() => { if (!done) { done = true; window.location.href = dest; } }, 2500);

        video.currentTime  = 0;
        video.playbackRate = 4;
        video.play().catch(() => { if (!done) { done = true; window.location.href = dest; } });

        raf = requestAnimationFrame(draw);
    }

    window.playOrbTransition = playOrbTransition;

})();
