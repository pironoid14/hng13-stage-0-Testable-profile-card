// JavaScript file for updating time in the profile card
function updateTime() {
    const timeElement = document.querySelector('[data-testid="test-user-time"]');
    timeElement.textContent = Date.now();
    requestAnimationFrame(updateTime);
}
updateTime();