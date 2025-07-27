// original lines 1203-1351
function startMovie() {
document.getElementById('setup-screen').classList.add('hidden');
document.getElementById('movie-screen').classList.remove('hidden');
document.getElementById('current-movie-title').textContent = gameState.movieTitle;

const setupScreen = document.getElementById('relationship-setup');
if (setupScreen) {
setupScreen.remove();
}

if (gameState.isKillerMode) {
document.getElementById('killer-controls').classList.remove('hidden');
displayKillerSelection();
}

gameState.currentAct = 1;
gameState.events = [];
gameState.autoPlay = false;
gameState.movieComplete = false;

updateProgress();
updateMovieControls();
startAct1();
}

function updateProgress() {
const progress = ((gameState.currentAct - 1) / 3) * 100;
document.getElementById('movie-progress').style.width = progress + '%';
document.getElementById('current-act-display').textContent = `Act ${gameState.currentAct}`;
}

function addEvent(type, text) {
gameState.events.push({ type, text, act: gameState.currentAct });
updateMovieLog();

setTimeout(() => {
const lastEvent = document.querySelector('.event:last-child');
if (lastEvent) {
switch(type) {
case 'death':
createBeep(150, 0.3);
flashScreen('rgba(255, 0, 0, 0.4)', 300);
createBloodParticles(lastEvent, 5);
addVisualEffect(lastEvent, 'shake-effect');
break;
case 'attack':
createBeep(200, 0.1);
flashScreen('rgba(255, 150, 0, 0.3)', 150);
addVisualEffect(lastEvent, 'pulse-effect');
break;
case 'reveal':
createBeep(300, 0.5);
flashScreen('rgba(138, 43, 226, 0.3)', 400);
addVisualEffect(lastEvent, 'pulse-effect', 1000);
break;
case 'title':
createBeep(600, 0.1);
addVisualEffect(lastEvent, 'pulse-effect', 1000);
break;
}
}
}, 100);
}

function updateMovieLog() {
const log = document.getElementById('movie-log');
const latestEvent = gameState.events[gameState.events.length - 1];
const eventDiv = document.createElement('div');
eventDiv.className = `event ${latestEvent.type}`;
eventDiv.textContent = latestEvent.text;
log.appendChild(eventDiv);
log.scrollTop = log.scrollHeight;
updateCastGridStatus();
}

function killCharacter(victim, killer, act) {
victim.status = 'Dead';
victim.actStatuses[act] = 'Killed';
victim.killedBy = killer.name;
victim.deathAct = act;
victim.edgic[act] = 'CP5';
}

function attackCharacter(victim, act) {
if (victim.status === 'Alive') {
victim.actStatuses[act] = 'Attacked';
victim.edgic[act] = 'CP4';
}
}

function updateMovieControls() {
const continueBtn = document.getElementById('continue-btn');
const autoplayBtn = document.getElementById('autoplay-btn');
const skipBtn = document.getElementById('skip-btn');
const viewResultsBtn = document.getElementById('view-results-btn');

if (gameState.movieComplete) {
continueBtn.style.display = 'none';
autoplayBtn.style.display = 'none';
skipBtn.style.display = 'none';
viewResultsBtn.style.display = 'inline-block';
} else if (gameState.autoPlay) {
continueBtn.style.display = 'none';
autoplayBtn.textContent = 'Disable Autoplay';
skipBtn.style.display = 'inline-block';
viewResultsBtn.style.display = 'none';
} else {
continueBtn.style.display = 'inline-block';
autoplayBtn.textContent = 'Enable Autoplay';
skipBtn.style.display = 'inline-block';
viewResultsBtn.style.display = 'none';
}
}

function updateStoryStatus() {
const statusDiv = document.getElementById('story-status');
if (gameState.movieComplete) {
statusDiv.textContent = 'Movie Complete! Click "View Final Results" to see the final tables.';
statusDiv.style.color = '#4CAF50';
} else if (gameState.isKillerMode && gameState.killerPlayer && document.getElementById('killer-action-area')?.innerHTML.includes('KILLER ACTIONS AVAILABLE')) {
statusDiv.textContent = `🔪 KILLER TURN - Choose your next move as ${gameState.killerPlayer.name}`;
statusDiv.style.color = '#ff4444';
} else if (gameState.autoPlay) {
statusDiv.textContent = `Autoplay Mode - Act ${gameState.currentAct} (${gameState.currentStoryIndex}/${gameState.storyQueue.length} events)`;
statusDiv.style.color = '#ff4444';
} else {
statusDiv.textContent = `Manual Mode - Act ${gameState.currentAct} - Click "Continue Story" for next event (${gameState.currentStoryIndex}/${gameState.storyQueue.length})`;
statusDiv.style.color = '#ccc';
}
}

function continueStory() {
createBeep(600, 0.05);
if (gameState.currentStoryIndex < gameState.storyQueue.length) {
playNextStoryEvent();
} else {
if (gameState.movieComplete) {
updateMovieControls();
}
updateStoryStatus();

if (gameState.isKillerMode && gameState.killerPlayer && !gameState.movieComplete) {
const aliveVictims = gameState.characters.filter(c =>
c.status === 'Alive' && c.id !== gameState.killerPlayer.id
);
if (aliveVictims.length > 0 && Math.random() < 0.4) {
showKillerActions();
document.getElementById('force-killer-action').style.display = 'inline-block';
document.getElementById('killer-help-text').style.display = 'block';
updateStoryStatus();
}
}
}
}

function playNextStoryEvent() {
if (gameState.currentStoryIndex >= gameState.storyQueue.length) {
updateStoryStatus();
if (gameState.isKillerMode && gameState.killerPlayer && !gameState.movieComplete) {
const aliveVictims = gameState.characters.filter(c =>
c.status === 'Alive' && c.id !== gameState.killerPlayer.id
);
if (aliveVictims.length > 0) {
showKillerActions();
document.getElementById('force-killer-action').style.display = 'inline-block';
document.getElementById('killer-help-text').style.display = 'block';
updateStoryStatus();
}
}
return;
}

const event = gameState.storyQueue[gameState.currentStoryIndex];

if (event.type === 'function') {
e
