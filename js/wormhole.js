(function () {

    function playWormhole(dest) {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:all;';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let W, H;

        function resize() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        resize();

        const TOTAL_MS  = 1700;
        const NUM_RINGS = 34;
        const start     = performance.now();
        let   done      = false;

        function frame(now) {
            if (done) return;

            const elapsed = now - start;
            const t       = Math.min(elapsed / TOTAL_MS, 1);
            const time    = elapsed * 0.001;

            // Tunnel speed accelerates as you're pulled in
            const speed = 0.16 + t * 0.60;

            ctx.clearRect(0, 0, W, H);

            // ── BACKGROUND ──────────────────────────────────────────
            ctx.fillStyle = `rgba(2, 1, 8, ${Math.min(t * 3.8, 1)})`;
            ctx.fillRect(0, 0, W, H);

            const cx = W / 2;
            const cy = H / 2;

            // ── TUNNEL RINGS ─────────────────────────────────────────
            // Classic infinite tunnel: rings are born at center (phase=0)
            // and rush outward to the edge (phase=1), then loop back.
            // This creates the illusion of infinite forward motion.
            for (let i = 0; i < NUM_RINGS; i++) {

                // Evenly staggered phases, advancing with time
                const phase = ((i / NUM_RINGS) + time * speed) % 1.0;

                // Perspective foreshortening — slow near center, fast near edge
                const p  = Math.pow(phase, 0.52);

                const rx = W * 0.74 * p;
                const ry = H * 0.62 * p;

                if (rx < 1) continue;

                // Spiral vortex: rings closer to edge lag behind in rotation
                // This makes the tunnel appear to corkscrew
                const globalSpin = time * 1.6;
                const twist      = globalSpin - phase * Math.PI * 5.5;

                // Alpha: fade in from center, fade out at edge
                let alpha;
                if      (phase < 0.07) alpha = phase / 0.07;
                else if (phase > 0.78) alpha = 1 - (phase - 0.78) / 0.22;
                else                   alpha = 1;
                alpha *= 0.78;

                // Color: deep rose at center → violet → bright lavender at edge
                const r = Math.round(195 + phase * 55);
                const g = Math.round(35  - phase * 15);
                const b = Math.round(215 + phase * 40);

                // Line weight: thicker at center (feels closer), hairline at edge
                const lw = Math.max(0.3, 2.4 - phase * 2.0);

                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(twist);
                ctx.scale(1, ry / rx);          // squash circle → ellipse

                ctx.beginPath();
                ctx.arc(0, 0, rx, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
                ctx.lineWidth   = lw;
                ctx.stroke();
                ctx.restore();
            }

            // ── SPEED STREAKS ────────────────────────────────────────
            // Thin radial lines that rush past — reinforce velocity
            if (t > 0.12) {
                const fadeIn = Math.min((t - 0.12) / 0.18, 1);
                const streakCount = 22;

                for (let i = 0; i < streakCount; i++) {
                    const angle      = (i / streakCount) * Math.PI * 2 + time * 0.25;
                    const sPhase     = ((i * 0.618 + time * 0.65) % 1);
                    const near       = sPhase * Math.min(W, H) * 0.52;
                    const len        = Math.min(W, H) * 0.07 * sPhase;
                    const sa         = 0.18 * sPhase * fadeIn;

                    ctx.beginPath();
                    ctx.moveTo(cx + Math.cos(angle) * near,
                               cy + Math.sin(angle) * near);
                    ctx.lineTo(cx + Math.cos(angle) * (near + len),
                               cy + Math.sin(angle) * (near + len));
                    ctx.strokeStyle = `rgba(215,140,255,${sa})`;
                    ctx.lineWidth   = 1;
                    ctx.stroke();
                }
            }

            // ── CENTER CORE GLOW ─────────────────────────────────────
            // The "pupil" at the far end of the tunnel, shrinks as we rush in
            const coreR = Math.max(0, 90 - t * 160);
            if (coreR > 1) {
                const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
                cg.addColorStop(0,   `rgba(255,225,255,${0.65 * (1 - t * 1.5)})`);
                cg.addColorStop(0.4, `rgba(200, 90,240,${0.35 * (1 - t * 1.5)})`);
                cg.addColorStop(1,   'transparent');
                ctx.fillStyle = cg;
                ctx.beginPath();
                ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
                ctx.fill();
            }

            // ── WHITE FLASH ──────────────────────────────────────────
            // Snap to white in the final 15% — cuts to lookbook cleanly
            if (t > 0.85) {
                const ft    = (t - 0.85) / 0.15;
                const flash = ft * ft;
                ctx.fillStyle = `rgba(255,248,255,${flash})`;
                ctx.fillRect(0, 0, W, H);
            }

            if (t >= 1) {
                done = true;
                window.location.href = dest;
            } else {
                requestAnimationFrame(frame);
            }
        }

        requestAnimationFrame(frame);
    }

    window.playWormhole = playWormhole;

})();
