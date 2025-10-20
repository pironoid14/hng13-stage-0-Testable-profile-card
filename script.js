// JavaScript file for updating time in the profile card and handling avatar upload/URL
function updateTime() {
    const timeElement = document.querySelector('[data-testid="test-user-time"]');
    if (timeElement) {
        timeElement.textContent = Date.now();
        requestAnimationFrame(updateTime);
    }
}
updateTime();

// Avatar upload and URL logic
window.addEventListener('DOMContentLoaded', function() {
    const avatarImg = document.getElementById('profile-avatar-img');
    const avatarUrlInput = document.getElementById('avatar-url-input');
    const avatarUploadInput = document.getElementById('avatar-upload-input');
    const avatarUploadUrl = document.getElementById('avatar-upload-url');

    if (avatarUrlInput) {
        avatarUrlInput.addEventListener('change', function() {
            if (avatarUrlInput.value) {
                avatarImg.src = avatarUrlInput.value;
                avatarUploadUrl.textContent = avatarUrlInput.value;
                avatarUploadUrl.style.display = 'block';
            }
        });
    }

    if (avatarUploadInput) {
        avatarUploadInput.addEventListener('change', function() {
            const file = avatarUploadInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarImg.src = e.target.result;
                    avatarUploadUrl.textContent = e.target.result;
                    avatarUploadUrl.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// Contact form validation and handling
(function() {
    const form = document.getElementById('contact-form');
    if (!form) return; // nothing to do if contact form not present

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const successEl = document.getElementById('contact-success');

    const errors = {
        name: document.getElementById('error-name'),
        email: document.getElementById('error-email'),
        subject: document.getElementById('error-subject'),
        message: document.getElementById('error-message')
    };

    function setError(field, text) {
        const el = errors[field];
        if (!el) return;
        el.textContent = text || '';
        const input = ({name: nameInput, email: emailInput, subject: subjectInput, message: messageInput})[field];
        if (text) {
            input.setAttribute('aria-invalid', 'true');
            // ensure the input is described by the error element
            input.setAttribute('aria-describedby', el.id);
            input.classList.add('invalid');
        } else {
            input.removeAttribute('aria-invalid');
            // keep aria-describedby present so screen readers always have the relationship
            input.setAttribute('aria-describedby', el.id);
            input.classList.remove('invalid');
        }
    }

    function validate() {
        let valid = true;
        // name required
        if (!nameInput.value.trim()) {
            setError('name', 'Full name is required');
            valid = false;
        } else {
            setError('name', '');
        }

        // email required + basic format
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
            setError('email', 'Email is required');
            valid = false;
        } else if (!emailRegex.test(emailVal)) {
            setError('email', 'Please enter a valid email (name@example.com)');
            valid = false;
        } else {
            setError('email', '');
        }

        // subject required
        if (!subjectInput.value.trim()) {
            setError('subject', 'Subject is required');
            valid = false;
        } else {
            setError('subject', '');
        }

        // message required and min length
        const msg = messageInput.value.trim();
        if (!msg) {
            setError('message', 'Message is required');
            valid = false;
        } else if (msg.length < 10) {
            setError('message', 'Message must be at least 10 characters');
            valid = false;
        } else {
            setError('message', '');
        }

        return valid;
    }

    // Live validation on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            validate();
            if (successEl) successEl.style.display = 'none';
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validate()) {
            // On success: show confirmation message and reset form
            if (successEl) {
                successEl.textContent = 'Thanks — your message has been sent.';
                successEl.style.display = 'block';
            }
            form.reset();
            // Ensure errors cleared and aria attributes removed
            Object.keys(errors).forEach(k => setError(k, ''));
            // Move focus to success message for screen readers
            if (successEl) successEl.focus && successEl.focus();
        } else {
            if (successEl) successEl.style.display = 'none';
            // focus first invalid field
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) firstInvalid.focus();
        }
    });
})();

// Sidebar collapse/expand behavior
(function() {
    const nav = document.getElementById('site-nav');
    const toggle = document.getElementById('nav-toggle');
    if (!nav || !toggle) return;

    // initialize based on saved preference
    const saved = localStorage.getItem('nav-collapsed');
    if (saved === 'true') {
        nav.classList.add('collapsed');
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', () => {
        const isCollapsed = nav.classList.toggle('collapsed');
        toggle.setAttribute('aria-expanded', (!nav.classList.contains('collapsed')).toString());
        localStorage.setItem('nav-collapsed', nav.classList.contains('collapsed').toString());
    });

    // Allow toggle via Enter/Space when focused
    toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle.click();
        }
    });
})();