// === relationships.js ===
// Manages relationships between characters affecting survival chances, loyalty, and story events.

// Ordered list of relationship types for cycling
const relationshipTypesOrder = [
  "ROMANTIC",
  "BEST_FRIENDS",
  "FAMILY",
  "ENEMIES",
  "EX_LOVERS",
  "NEUTRAL"
];

// Icons/emojis for relationship types
const relationshipTypeIcons = {
  ROMANTIC: "💕",
  BEST_FRIENDS: "👥",
  FAMILY: "👪",
  ENEMIES: "⚔️",
  EX_LOVERS: "💔",
  NEUTRAL: "🤝"
};

// Object storing current relationships with keys like "id1_id2"
let relationships = {};

// Create or update a relationship between two character IDs
function createRelationship(char1, char2, type) {
  if (char1 === char2) return; // No self-relationships
  const key = getRelationshipKey(char1, char2);
  relationships[key] = type;
}

// Generate a consistent key for two character IDs (sorted)
function getRelationshipKey(char1, char2) {
  return [char1, char2].sort().join("_");
}

// Get the relationship type between two characters
function getRelationship(char1, char2) {
  const key = getRelationshipKey(char1, char2);
  return relationships[key] || "NEUTRAL";
}

// Cycle the relationship type between two characters through the available types
function cycleRelationship(char1, char2) {
  const currentType = getRelationship(char1, char2);
  const currentIndex = relationshipTypesOrder.indexOf(currentType);
  const nextIndex = (currentIndex + 1) % relationshipTypesOrder.length;
  createRelationship(char1, char2, relationshipTypesOrder[nextIndex]);
  renderRelationshipPairs();
}

// Render the relationship pairs UI on the relationship setup screen
function renderRelationshipPairs() {
  const container = document.getElementById("relationship-pairs");
  container.innerHTML = ""; // Clear current UI

  const cast = window.gameState.cast; // Global cast array
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

// Clear all relationships and re-render UI
function clearAllRelationships() {
  relationships = {};
  renderRelationshipPairs();
}

// Generate random relationships for all character pairs
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

// Finalize relationship setup and move on to the movie screen
function finishRelationshipSetup() {
  document.getElementById("setup-screen").classList.add("hidden");
  document.getElementById("movie-screen").classList.remove("hidden");
  startMovie();
}

// Go back to cast customization screen from relationship setup
function backToCastCustomization() {
  document.getElementById("cast-customization").classList.remove("hidden");
  document.getElementById("relationship-setup").classList.add("hidden");
}

// Debug helper to test current relationships
function testRelationshipSystem() {
  console.log("Current Relationships:", relationships);
  alert("Relationship system tested - check console for details.");
}
