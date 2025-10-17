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