// original lines 972-1202
function calculateSurvivalChance(stats) {
const total = stats.survival * 2 + stats.intelligence + stats.athletics + stats.stealth + stats.luck;
return Math.min(90, Math.max(5, total * 1.2));
}

function setupCast() {
try {
console.log('setupCast function called');
const castSize = parseInt(document.getElementById('cast-size').value);
const gameMode = document.getElementById('game-mode').value;
const movieTitle = document.getElementById('movie-title').value || 'Untitled Horror';
const movieYear = parseInt(document.getElementById('movie-year').value) || new Date().getFullYear();
console.log('Values:', { castSize, gameMode, movieTitle, movieYear });

gameState.gameMode = gameMode;
gameState.movieTitle = movieTitle;
gameState.movieYear = movieYear;
gameState.isKillerMode = gameMode === 'killer';
gameState.characters = [];

const usedNames = new Set();
const usedArchetypes = new Set();

for (let i = 0; i < castSize; i++) {
let name, archetype;

do {
name = names[Math.floor(Math.random() * names.length)];
} while (usedNames.has(name));
usedNames.add(name);

if (archetypes.length >= castSize) {
do {
archetype = archetypes[Math.floor(Math.random() * archetypes.length)];
} while (usedArchetypes.has(archetype.name));
usedArchetypes.add(archetype.name);
} else {
archetype = archetypes[Math.floor(Math.random() * archetypes.length)];
}

const character = {
id: i,
name: name,
archetype: archetype,
stats: { ...archetype.stats },
status: 'Alive',
actStatuses: { 1: 'Alive', 2: 'Alive', 3: 'Alive' },
killedBy: null,
deathAct: null,
survivalChance: calculateSurvivalChance(archetype.stats),
edgic: { 1: 'UTR1', 2: 'UTR1', 3: 'UTR1' },
isReturning: false
};

gameState.characters.push(character);
}

console.log('Generated characters:', gameState.characters.length);

let killerCount = document.getElementById('killer-count').value;
if (killerCount === 'random') {
const rand = Math.random();
killerCount = rand < 0.6 ? 1 : rand < 0.9 ? 2 : 3;
} else {
killerCount = parseInt(killerCount);
}

gameState.killers = [];
const killerIndices = [];
while (killerIndices.length < killerCount) {
const index = Math.floor(Math.random() * gameState.characters.length);
if (!killerIndices.includes(index)) {
killerIndices.push(index);
gameState.killers.push(gameState.characters[index]);
}
}

console.log('Selected killers:', gameState.killers.length);
displayCastCustomization();
console.log('setupCast completed successfully');
} catch (error) {
console.error('Error in setupCast:', error);
alert('Error creating cast: ' + error.message);
}
}

function displayCastCustomization() {
const container = document.getElementById('cast-container');
container.innerHTML = '';

gameState.characters.forEach((character, index) => {
const card = document.createElement('div');
card.className = character.isReturning ? 'character-card returning' : 'character-card';
card.innerHTML = `
<div class="character-header">
<div class="character-avatar">${character.isReturning ? '🔁' : '👤'}</div>
<div class="character-info">
<h3>
<input type="text" value="${character.name}" onchange="updateCharacterName(${index}, this.value)" style="background: transparent; border: none; color: white; font-size: inherit; width: 100%;">
${character.isReturning ? '<span style="color: #4CAF50; font-size: 0.8rem;"> (RETURNING)</span>' : ''}
</h3>
<select class="archetype" onchange="updateCharacterArchetype(${index}, this.value)">
${archetypes.map(arch => `<option value="${arch.name}" ${arch.name === character.archetype.name ? 'selected' : ''}>${arch.name}</option>`).join('')}
</select>
</div>
</div>
<div class="stats-grid">
${Object.entries(character.stats).map(([stat, value]) => `
<div class="stat">
<div class="stat-label">${stat.charAt(0).toUpperCase() + stat.slice(1)}</div>
<div class="stat-bar">
<div class="stat-fill" style="width: ${value * 10}%"></div>
</div>
<input type="range" min="1" max="10" value="${value}" onchange="updateCharacterStat(${index}, '${stat}', this.value)" style="width: 100%; margin-top: 5px;">
</div>
`).join('')}
</div>
<div class="survival-chance">
Survival Chance: ${character.survivalChance.toFixed(1)}%
${character.isReturning ? '<br><span style="color: #4CAF50; font-size: 0.9rem;">📈 Veteran Survivor Bonuses Applied!</span>' : ''}
</div>
`;
container.appendChild(card);
});

const castContainer = document.getElementById('cast-container');
if (castContainer && castContainer.parentNode) {
const existingButtons = castContainer.parentNode.querySelector('.cast-buttons');
if (existingButtons) {
existingButtons.remove();
}

const buttonContainer = document.createElement('div');
buttonContainer.className = 'cast-buttons';
buttonContainer.style.textAlign = 'center';
buttonContainer.style.marginTop = '30px';
buttonContainer.innerHTML = `
<button class="btn" onclick="showRelationshipSetup()" style="background: linear-gradient(135deg, #4CAF50, #45a049); font-size: 18px; padding: 20px 30px;">
🔗 Setup Relationships & Start Movie
</button>
<br><br>
<button class="btn btn-secondary" onclick="randomizeCast()" style="margin: 5px;">🎲 Randomize All Stats</button>
<button class="btn btn-secondary" onclick="startMovie()" style="margin: 5px;">⏩ Skip Relationships & Start</button>
`;
castContainer.parentNode.insertBefore(buttonContainer, castContainer.nextSibling);
}

document.getElementById('cast-customization').classList.remove('hidden');
}

function updateCharacterName(index, name) {
gameState.characters[index].name = name;
}

function updateCharacterArchetype(index, archetypeName) {
const archetype = archetypes.find(a => a.name === archetypeName);
gameState.characters[index].archetype = archetype;
gameState.characters[index].stats = { ...archetype.stats };
gameState.characters[index].survivalChance = calculateSurvivalChance(archetype.stats);
displayCastCustomization();
}

function updateCharacterStat(index, stat, value) {
gameState.characters[index].stats[stat] = parseInt(value);
gameState.characters[index].survivalChance = calculateSurvivalChance(gameState.characters[index].stats);
displayCastCustomization();
}

function randomizeCast() {
gameState.characters.forEach(character => {
Object.keys(character.stats).forEach(stat => {
character.stats[stat] = Math.floor(Math.random() * 10) + 1;
});
character.survivalChance = calculateSurvivalChance(character.stats);
});
displayCastCustomization();
}
