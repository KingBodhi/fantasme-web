/**
 * Portal transition — expands from the clicked card center on departure,
 * contracts back to that same point on arrival.
 */
(function () {
    const DURATION   = 780;
    const STORE_KEY  = 'fp_portal_origin';

    function gradient(cxp, cyp) {
        return `radial-gradient(circle at ${cxp} ${cyp},
            #fffff5 0%,
            #eedcff 3.5%,
            #b068f8 9%,
            #4d14c2 19%,
            #16073c 36%,
            #040210 56%,
            #020208 100%)`;
    }

    function buildVeil(cx_px, cy_px, startOpen) {
        const cxp = (cx_px / window.innerWidth  * 100).toFixed(2) + '%';
        const cyp = (cy_px / window.innerHeight * 100).toFixed(2) + '%';
        const el  = document.createElement('div');
        Object.assign(el.style, {
            position:   'fixed',
            inset:      '0',
            zIndex:     '9999',
            background: gradient(cxp, cyp),
            clipPath:   `circle(${startOpen ? '165%' : '0%'} at ${cxp} ${cyp})`,
            transition: `clip-path ${DURATION}ms cubic-bezier(0.65, 0, 0.15, 1)`,
            willChange: 'clip-path',
            pointerEvents: startOpen ? 'none' : 'all',
        });
        document.body.appendChild(el);
        return { el, cxp, cyp };
    }

    /* ——— EXPAND (leaving a page) ——— */
    function portalLeave(href, cx_px, cy_px) {
        const { el, cxp, cyp } = buildVeil(cx_px, cy_px, false);
        sessionStorage.setItem(STORE_KEY, JSON.stringify({ cxp, cyp }));
        el.getBoundingClientRect(); // force reflow
        el.style.clipPath = `circle(165% at ${cxp} ${cyp})`;
        setTimeout(() => { window.location.href = href; }, DURATION + 40);
    }

    /* ——— CONTRACT (arriving at a page) ——— */
    function portalArrive() {
        const raw = sessionStorage.getItem(STORE_KEY);
        if (!raw) return;
        sessionStorage.removeItem(STORE_KEY);
        let cxp, cyp;
        try { ({ cxp, cyp } = JSON.parse(raw)); } catch { return; }

        const cx_px = parseFloat(cxp) / 100 * window.innerWidth;
        const cy_px = parseFloat(cyp) / 100 * window.innerHeight;
        const { el } = buildVeil(cx_px, cy_px, true);
        el.getBoundingClientRect();
        setTimeout(() => {
            el.style.clipPath = `circle(0% at ${cxp} ${cyp})`;
        }, 60);
        setTimeout(() => el.remove(), DURATION + 260);
    }

    /* ——— Wire product-card links on home ——— */
    function wireCards() {
        document.querySelectorAll('.card[data-product]').forEach(card => {
            card.addEventListener('click', function (e) {
                e.preventDefault();
                const id   = this.dataset.product;
                const rect = this.getBoundingClientRect();
                portalLeave(`product.html?id=${id}`, rect.left + rect.width / 2, rect.top + rect.height / 2);
            });
        });
    }

    /* ——— Wire outbound links on product page ——— */
    function wireBackLinks() {
        document.querySelectorAll('[data-portal-back]').forEach(el => {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href') || 'home.html';
                portalLeave(href, window.innerWidth / 2, window.innerHeight / 2);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (document.body.dataset.page === 'product') {
            portalArrive();
            wireBackLinks();
        } else {
            wireCards();
        }
    });
})();
