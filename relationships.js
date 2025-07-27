// original lines 501-614
const relationshipTypes = {
ROMANTIC: { name: 'Romantic Couple', emoji: '💕', survivalBonus: 2, loyaltyBonus: 3 },
BEST_FRIENDS: { name: 'Best Friends', emoji: '👥', survivalBonus: 1, loyaltyBonus: 2 },
FAMILY: { name: 'Family', emoji: '👪', survivalBonus: 2, loyaltyBonus: 3 },
ENEMIES: { name: 'Enemies', emoji: '⚔️', survivalBonus: -1, loyaltyBonus: -2 },
EX_LOVERS: { name: 'Ex-Lovers', emoji: '💔', survivalBonus: -1, loyaltyBonus: -1 },
NEUTRAL: { name: 'Neutral', emoji: '🤝', survivalBonus: 0, loyaltyBonus: 0 }
};

function createRelationship(char1, char2, type) {
const key = `${Math.min(char1.id, char2.id)}-${Math.max(char1.id, char2.id)}`;
gameState.relationships.set(key, {
characters: [char1.id, char2.id],
type: type,
strength: Math.floor(Math.random() * 3) + 3,
history: []
});
}

function getRelationship(char1, char2) {
const key = `${Math.min(char1.id, char2.id)}-${Math.max(char1.id, char2.id)}`;
return gameState.relationships.get(key);
}

function getCharacterRelationships(character) {
const relationships = [];
gameState.relationships.forEach((rel, key) => {
if (rel.characters.includes(character.id)) {
const otherId = rel.characters.find(id => id !== character.id);
const otherChar = gameState.characters.find(c => c.id === otherId);
if (otherChar) {
relationships.push({ character: otherChar, relationship: rel });
}
}
});
return relationships;
}

function findCharactersByRelationType(type) {
const pairs = [];
gameState.relationships.forEach((rel, key) => {
if (rel.type === type) {
const char1 = gameState.characters.find(c => c.id === rel.characters[0]);
const char2 = gameState.characters.find(c => c.id === rel.characters[1]);
if (char1 && char2) {
pairs.push([char1, char2]);
}
}
});
return pairs;
}

function testRelationshipSystem() {
alert('🔗 Relationship System Test!\n\nTo see the full relationship system:\n\n1. Click "Create Cast" button\n2. Customize your characters\n3. Look for "Setup Relationships & Start Movie" button\n4. Click it to see the relationship setup screen!\n\nThe relationship system adds:\n💕 Romantic couples\n👥 Best friends\n👪 Family bonds\n⚔️ Enemies\n💔 Ex-lovers\n\nThese affect survival chances, dialogue, and story events!');
console.log('Available relationship types:', relationshipTypes);
}

function showRelationshipSetup() {
document.getElementById('cast-customization').classList.add('hidden');
const setupScreen = document.createElement('div');
setupScreen.id = 'relationship-setup';
setupScreen.className = 'section';
setupScreen.innerHTML = `
<h2>Relationship Setup</h2>
<p style="color: #ccc; margin-bottom: 20px;">Define relationships between characters. These will affect survival chances, dialogue, and story events!</p>
<div style="margin-bottom: 20px;">
<button class="btn" onclick="generateRandomRelationships()">🎲 Generate Random Relationships</button>
<button class="btn btn-secondary" onclick="clearAllRelationships()">🧹 Clear All</button>
</div>
<div id="relationship-pairs" style="display: grid; gap: 15px; margin-bottom: 20px;"></div>
<div style="margin: 16px 0; padding: 10px 15px; background: #1a1a1a; border: 1px solid #555; border-radius: 8px; color: #fff; font-size: 15px;">
<strong>Relationship Legend:</strong><br/><br/>
💕 Romantic Partners &nbsp;&nbsp;&nbsp;&nbsp; 👪 Family Member &nbsp;&nbsp;&nbsp;&nbsp; 🤝 Friends/Acquaintances &nbsp;&nbsp;&nbsp;&nbsp; 😡 Enemies<br/>
🧊 Exes / Broken Up &nbsp;&nbsp;&nbsp;&nbsp; ⚔️ Mutual Hatred &nbsp;&nbsp;&nbsp;&nbsp; 🧍 No Relationship
</div>
<div style="text-align: center; margin-top: 20px;">
<button class="btn" onclick="finishRelationshipSetup()">Continue to Movie</button>
<button class="btn btn-secondary" onclick="backToCastCustomization()">Back to Cast</button>
</div>
`;
const castCustomization = document.getElementById('cast-customization');
castCustomization.parentNode.insertBefore(setupScreen, castCustomization.nextSibling);
displayRelationshipPairs();
}

function displayRelationshipPairs() {
const container = document.getElementById("relationship-pairs");
if (!container) return;
container.innerHTML = "";

const characters = gameState.characters;
const table = document.createElement("table");
table.style.width = "100%";
table.style.borderCollapse = "collapse";
table.style.textAlign = "center";
table.style.color = "#ccc";
table.style.fontSize = "14px";

let headerRow = "<tr><th></th>";
characters.forEach(c => {
headerRow += "<th style='padding:6px;'>" + c.name + "<br><span style='color:#888; font-size:12px;'>" + c.archetype.name + "</span></th>";
});
headerRow += "</tr>";
table.innerHTML += headerRow;

characters.forEach((rowChar, i) => {
let rowHTML = "<tr><th style='text-align:left; padding:6px;'>" + rowChar.name + "<br><span style='color:#888; font-size:12px;'>" + rowChar.archetype.name + "</span></th>";
characters.forEach((colChar, j) => {
if (i === j) {
rowHTML += "<td style='opacity:0.2;'>—</td>";
} else {
const rel = getRelationship(rowChar, colChar);
const emoji = rel ? rel.type.emoji : "🤝";
rowHTML += "<td style='cursor:pointer;' onclick='cycleRelationship(" + rowChar.id + "," + colChar.id + ", this)'>" + emoji + "</td>";
}
});
rowHTML += "</tr>";
table.innerHTML += rowHTML;
});

container.appendChild(table);
}

function cycleRelationship(char1Id, char2Id, cell) {
const char1 = gameState.characters.find(c => c.id === char1Id);
const char2 = gameState.characters.find(c => c.id === char2Id);
const types = Object.keys(relationshipTypes);
const current = getRelationship(char1, char2);
let nextIndex = 0;

if (current) {
const curKey = types.find(key => relationshipTypes[key] === current.type);
nextIndex = (types.indexOf(curKey) + 1) % types.length;
}

const nextType = relationshipTypes[types[nextIndex]];
createRelationship(char1, char2, nextType);
cell.innerHTML = nextType.emoji;
}

function setRelationship(char1Id, char2Id, relationshipKey) {
const char1 = gameState.characters.find(c => c.id === char1Id);
const char2 = gameState.characters.find(c => c.id === char2Id);
const relType = relationshipTypes[relationshipKey];
if (char1 && char2 && relType) {
createRelationship(char1, char2, relType);
}
}

function generateRandomRelationships() {
gameState.relationships.clear();
const characters = gameState.characters;
const relationshipKeys = Object.keys(relationshipTypes);

if (characters.length >= 2) {
const couple = [characters[0], characters[1]];
createRelationship(couple[0], couple[1], relationshipTypes.ROMANTIC);
}

if (characters.length >= 4) {
const friends = [characters[2], characters[3]];
createRelationship(friends[0], friends[1], relationshipTypes.BEST_FRIENDS);
}

for (let i = 0; i < characters.length; i++) {
for (let j = i + 1; j < characters.length; j++) {
const char1 = characters[i];
const char2 = characters[j];
if (!getRelationship(char1, char2)) {
if (Math.random() < 0.6) {
createRelationship(char1, char2, relationshipTypes.NEUTRAL);
} else {
const randomKey = relationshipKeys[Math.floor(Math.random() * relationshipKeys.length)];
createRelationship(char1, char2, relationshipTypes[randomKey]);
}
}
}
}
displayRelationshipPairs();
}

function clearAllRelationships() {
gameState.relationships.clear();
displayRelationshipPairs();
}

function finishRelationshipSetup() {
const setupScreen = document.getElementById('relationship-setup');
if (setupScreen) {
setupScreen.remove();
}
startMovie();
}

function backToCastCustomization() {
const setupScreen = document.getElementById('relationship-setup');
if (setupScreen) {
setupScreen.remove();
}
document.getElementById('cast-customization').classList.remove('hidden');
}
