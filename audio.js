// === Audio Module ===
// Manages the floating audio widget with ambient, SFX, and music toggles,
// volume control, drag-and-drop repositioning, and sound effects.

// State variables for audio
let audioWidget = document.getElementById("audio-widget");
let audioContent = document.getElementById("audio-content");
let minimizeBtn = document.getElementById("minimize-audio");
let isAudioMinimized = false;

let dragHandle = document.getElementById("audio-drag-handle");
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Initialize AudioContext and sound nodes for beep and music
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
let masterGain;
let ambientGain;
let sfxGain;
let musicGain;

let ambientOn = true;
let sfxOn = true;
let musicOn = true;

// Initialize audio context and gain nodes
function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    ambientGain = audioCtx.createGain();
    sfxGain = audioCtx.createGain();
    musicGain = audioCtx.createGain();

    ambientGain.connect(masterGain);
    sfxGain.connect(masterGain);
    musicGain.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    setMasterVolume(0.3);
  }
}

// Toggle ambient audio on/off
function toggleAmbient() {
  ambientOn = !ambientOn;
  ambientGain.gain.setValueAtTime(ambientOn ? 1 : 0, audioCtx.currentTime);
  document.getElementById("toggle-ambient").classList.toggle("muted", !ambientOn);
}

// Toggle sound effects on/off
function toggleSFX() {
  sfxOn = !sfxOn;
  sfxGain.gain.setValueAtTime(sfxOn ? 1 : 0, audioCtx.currentTime);
  document.getElementById("toggle-sfx").classList.toggle("muted", !sfxOn);
}

// Toggle music on/off
function toggleMusic() {
  musicOn = !musicOn;
  musicGain.gain.setValueAtTime(musicOn ? 1 : 0, audioCtx.currentTime);
  document.getElementById("toggle-music").classList.toggle("muted", !musicOn);
}

// Set master volume from slider value (0 to 1 range)
function setMasterVolume(value) {
  initAudio();
  let volume = value / 100;
  masterGain.gain.setTargetAtTime(volume, audioCtx.currentTime, 0.01);
}

// Minimize or restore the audio widget
function toggleAudioWidget() {
  if (!audioWidget) return;
  isAudioMinimized = !isAudioMinimized;
  audioWidget.classList.toggle("minimized", isAudioMinimized);
  minimizeBtn.textContent = isAudioMinimized ? "+" : "−";
}

// Start drag event for audio widget
function startDrag(e) {
  isDragging = true;
  dragOffsetX = e.clientX - audioWidget.offsetLeft;
  dragOffsetY = e.clientY - audioWidget.offsetTop;
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);
  audioWidget.classList.add("dragging");
}

// Handle drag movement
function drag(e) {
  if (!isDragging) return;
  audioWidget.style.left = e.clientX - dragOffsetX + "px";
  audioWidget.style.top = e.clientY - dragOffsetY + "px";
}

// End drag event
function endDrag() {
  isDragging = false;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", endDrag);
  audioWidget.classList.remove("dragging");
}

// Initialize event listeners for drag handle and volume slider
function setupAudioWidget() {
  if (!dragHandle) return;
  dragHandle.addEventListener("mousedown", startDrag);
  const volumeSlider = document.getElementById("master-volume");
  if (volumeSlider) {
    volumeSlider.addEventListener("input", e => setMasterVolume(e.target.value));
  }
}

// Play a short beep sound for feedback (e.g., toggles)
function playBeep() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.type = "sine";
  osc.frequency.setValueAtTime(440, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

// Initialize audio on page load
window.addEventListener("load", () => {
  initAudio();
  setupAudioWidget();
});
