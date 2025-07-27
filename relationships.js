// === relationships.js ===
// Manages relationships between characters affecting survival, loyalty, and story events.

// Relationship types in order to cycle through
const relationshipTypesOrder = [
  "ROMANTIC",
  "BEST_FRIENDS",
  "FAMILY",
  "ENEMIES",
  "EX_LOVERS",
  "NEUTRAL",
];

// Emojis for relationship types
const relationshipTypeIcons = {
  ROMANTIC: "💕",
  BEST_FRIENDS: "👥",
  FAMILY: "👪",
  ENEMIES: "⚔️",
  EX_LOVERS: "💔",
  NEUTRAL: "🤝",
};

// Store relationships as key strings "id1_id2" => type
let relationships = {};

// Create or update relationship between two character IDs
function createRelationship(char1, char2, type) {
  if (char1 === char2) return;
  const key = getRelationshipKey(char1, char2);
  relationships[key] = type;
}

// Generate consistent key for two IDs (sorted)
function getRelationshipKey(char1, char2) {
  return [char1, char2].sort().join("_");
}

// Retrieve relationship type between two characters
function getRelationship(char1, char2) {
  const key = getRelationshipKey(char1, char2);
  return relationships[key] || "NEUTRAL";
}

// Cycle relationship type between two characters
function cycleRelationship(char1, char2) {
  const currentType = getRelationship(char1, char2);
  const currentIndex = relationshipTypesOrder.indexOf(currentType);
  const nextIndex = (currentIndex + 1) % relationshipTypesOrder.length;
  createRelationship(char1, char2, relationshipTypesOrder[nextIndex]);
  renderRelationshipPairs();
}

// Render UI for relationship pairs
function renderRelationshipPairs() {
  const container = document.getElementById("relationship-pairs");
  container.innerHTML = "";

  const cast = window.gameState.cast;
  for (let i = 0; i < cast.length; i++) {
    for (let j = i + 1; j < cast.length; j++) {
      const char1 = cast[i];
      const char2 = cast[j];
      const relType = getRelationship(char1.id, char2.id);
      const btn = document.createElement("button");
      btn.textContent = `${char1.name} & ${char2.name}: ${relationshipTypeIcons[relType]} ${relType.replace(/_/g, " ")}`;
      btn.className = "btn btn-secondary";
      btn.onclick = () => {
        cycleRelationship(char1.id, char2.id);
      };
      container.appendChild(btn);
    }
  }
}

// Clear all relationships
function clearAllRelationships() {
  relationships = {};
  renderRelationshipPairs();
}

// Generate random relationships for all pairs
function generateRandomRelationships() {
  const cast = window.gameState.cast;
  relationships = {};
  for (let i = 0; i < cast.length; i++) {
    for (let j = i + 1; j < cast.length; j++) {
      const randType = relationshipTypesOrder[Math.floor(Math.random() * relationshipTypesOrder.length)];
      createRelationship(cast[i].id, cast[j].id, randType);
    }
  }
  renderRelationshipPairs();
}

// Proceed to movie screen from relationship setup
function finishRelationshipSetup() {
  document.getElementById("setup-screen").classList.add("hidden");
  document.getElementById("movie-screen").classList.remove("hidden");
  startMovie();
}

// Back button to cast customization
function backToCastCustomization() {
  document.getElementById("cast-customization").classList.remove("hidden");
  document.getElementById("relationship-setup").classList.add("hidden");
}

// Debugging: log relationships
function testRelationshipSystem() {
  console.log("Current Relationships:", relationships);
  alert("Relationship system tested - check console for details.");
}
