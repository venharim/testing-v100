// original lines 615-871
let audioContext;
let audioSettings = {
ambient: true,
sfx: true,
music: true,
masterVolume: 0.3
};

let audioWidgetState = {
isMinimized: false,
isDragging: false,
dragOffset: { x: 0, y: 0 },
position: { x: 20, y: 20 }
};

function initAudioWidget() {
const widget = document.getElementById('audio-widget');
const dragHandle = document.getElementById('audio-drag-handle');
if (!widget || !dragHandle) return;

widget.style.right = audioWidgetState.position.x + 'px';
widget.style.top = audioWidgetState.position.y + 'px';
widget.style.left = 'auto';
widget.style.bottom = 'auto';

dragHandle.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDrag);

dragHandle.addEventListener('touchstart', startDragTouch, { passive: false });
document.addEventListener('touchmove', dragTouch, { passive: false });
document.addEventListener('touchend', stopDrag);
}

function startDrag(e) {
audioWidgetState.isDragging = true;
const widget = document.getElementById('audio-widget');
const rect = widget.getBoundingClientRect();
audioWidgetState.dragOffset.x = e.clientX - rect.left;
audioWidgetState.dragOffset.y = e.clientY - rect.top;
widget.classList.add('dragging');
e.preventDefault();
}

function startDragTouch(e) {
const touch = e.touches[0];
audioWidgetState.isDragging = true;
const widget = document.getElementById('audio-widget');
const rect = widget.getBoundingClientRect();
audioWidgetState.dragOffset.x = touch.clientX - rect.left;
audioWidgetState.dragOffset.y = touch.clientY - rect.top;
widget.classList.add('dragging');
e.preventDefault();
}

function drag(e) {
if (!audioWidgetState.isDragging) return;
const widget = document.getElementById('audio-widget');
const x = e.clientX - audioWidgetState.dragOffset.x;
const y = e.clientY - audioWidgetState.dragOffset.y;
updateWidgetPosition(widget, x, y);
e.preventDefault();
}

function dragTouch(e) {
if (!audioWidgetState.isDragging) return;
const touch = e.touches[0];
const widget = document.getElementById('audio-widget');
const x = touch.clientX - audioWidgetState.dragOffset.x;
const y = touch.clientY - audioWidgetState.dragOffset.y;
updateWidgetPosition(widget, x, y);
e.preventDefault();
}

function updateWidgetPosition(widget, x, y) {
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const widgetRect = widget.getBoundingClientRect();
const minX = 0;
const maxX = windowWidth - widgetRect.width;
const minY = 0;
const maxY = windowHeight - widgetRect.height;

const clampedX = Math.max(minX, Math.min(maxX, x));
const clampedY = Math.max(minY, Math.min(maxY, y));

widget.style.left = clampedX + 'px';
widget.style.top = clampedY + 'px';
widget.style.right = 'auto';
widget.style.bottom = 'auto';

audioWidgetState.position.x = clampedX;
audioWidgetState.position.y = clampedY;
}

function stopDrag() {
if (!audioWidgetState.isDragging) return;
audioWidgetState.isDragging = false;
const widget = document.getElementById('audio-widget');
widget.classList.remove('dragging');
}

function toggleAudioWidget() {
const widget = document.getElementById('audio-widget');
const minimizeBtn = document.getElementById('minimize-audio');
const content = document.getElementById('audio-content');

audioWidgetState.isMinimized = !audioWidgetState.isMinimized;

if (audioWidgetState.isMinimized) {
widget.classList.add('minimizing');
setTimeout(() => {
widget.classList.add('minimized');
widget.classList.remove('minimizing');
}, 150);
minimizeBtn.textContent = '+';
minimizeBtn.title = 'Expand audio controls';
createBeep(500, 0.05);
} else {
widget.classList.add('maximizing');
widget.classList.remove('minimized');
setTimeout(() => {
widget.classList.remove('maximizing');
}, 300);
minimizeBtn.textContent = '−';
minimizeBtn.title = 'Minimize audio controls';
createBeep(700, 0.05);
}
}

window.addEventListener('resize', () => {
if (audioWidgetState.isDragging) return;
const widget = document.getElementById('audio-widget');
if (!widget) return;

const rect = widget.getBoundingClientRect();
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

if (rect.right > windowWidth || rect.bottom > windowHeight || rect.left < 0 || rect.top < 0) {
const newX = Math.max(0, Math.min(windowWidth - rect.width, rect.left));
const newY = Math.max(0, Math.min(windowHeight - rect.height, rect.top));
widget.style.left = newX + 'px';
widget.style.top = newY + 'px';
widget.style.right = 'auto';
widget.style.bottom = 'auto';
audioWidgetState.position.x = newX;
audioWidgetState.position.y = newY;
}
});

function initAudioSystem() {
try {
audioContext = new (window.AudioContext || window.webkitAudioContext)();
console.log('Audio system initialized');
} catch (error) {
console.log('Audio not supported');
audioContext = null;
}
}

function createBeep(frequency, duration) {
if (!audioContext || !audioSettings.sfx) return;
try {
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

oscillator.frequency.value = frequency;
oscillator.type = 'sine';

gainNode.gain.setValueAtTime(0, audioContext.currentTime);
gainNode.gain.linearRampToValueAtTime(audioSettings.masterVolume * 0.1, audioContext.currentTime + 0.01);
gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

oscillator.start(audioContext.currentTime);
oscillator.stop(audioContext.currentTime + duration);
} catch (error) {
console.log('Audio playback failed');
}
}

function toggleAmbient() {
audioSettings.ambient = !audioSettings.ambient;
const btn = document.getElementById('toggle-ambient');
btn.classList.toggle('muted', !audioSettings.ambient);
}

function toggleSFX() {
audioSettings.sfx = !audioSettings.sfx;
const btn = document.getElementById('toggle-sfx');
btn.classList.toggle('muted', !audioSettings.sfx);
}

function toggleMusic() {
audioSettings.music = !audioSettings.music;
const btn = document.getElementById('toggle-music');
btn.classList.toggle('muted', !audioSettings.music);
}

function setMasterVolume(value) {
audioSettings.masterVolume = value / 100;
}

function addVisualEffect(element, effectClass, duration = 500) {
if (!element) return;
element.classList.add(effectClass);
setTimeout(() => element.classList.remove(effectClass), duration);
}

function createBloodParticles(element, count = 3) {
if (!element) return;
for (let i = 0; i < count; i++) {
const particle = document.createElement('div');
particle.className = 'blood-particle';
particle.style.left = Math.random() * 100 + '%';
particle.style.animationDelay = Math.random() * 1 + 's';
element.style.position = 'relative';
element.appendChild(particle);
setTimeout(() => particle.remove(), 3000);
}
}

function flashScreen(color = 'rgba(255, 0, 0, 0.3)', duration = 200) {
const flash = document.createElement('div');
flash.style.cssText = `
position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
background: ${color}; z-index: 9999; pointer-events: none;
animation: flicker ${duration}ms ease-out;
`;
document.body.appendChild(flash);
setTimeout(() => flash.remove(), duration);
}
