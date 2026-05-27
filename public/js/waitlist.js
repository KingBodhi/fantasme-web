(function () {
    const form    = document.getElementById('wl-form');
    const panel   = document.getElementById('wl-panel');
    const success = document.getElementById('wl-success');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = document.getElementById('first-name');
        const lastName  = document.getElementById('last-name');
        const email     = document.getElementById('email');
        const agree     = document.getElementById('agree');
        let valid = true;

        // Simple client-side validation
        [firstName, lastName, email].forEach(field => {
            field.classList.remove('error');
            if (!field.value.trim()) {
                field.classList.add('error');
                valid = false;
            }
        });

        if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.classList.add('error');
            valid = false;
        }

        if (!agree.checked) {
            agree.closest('.form-check').style.opacity = '0.5';
            setTimeout(() => {
                agree.closest('.form-check').style.opacity = '1';
            }, 600);
            valid = false;
        }

        if (!valid) return;

        // Fade out form, reveal success
        panel.classList.add('fade-out');
        setTimeout(() => {
            panel.style.display = 'none';
            success.classList.add('visible');
        }, 480);
    });

    // Clear error state on input
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', () => input.classList.remove('error'));
    });

    // Fade in on page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });
})();
