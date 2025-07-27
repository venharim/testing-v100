// === app.js ===
// Core game logic and UI handling for Slasher Movie Simulator

// Global game state
const gameState = {
  cast: [],
  movieTitle: "",
  releaseYear: 2025,
  gameMode: "spectator",
  castSize: 8,
  killerCount: 1,
  currentAct: 1,
  currentScene: 0,
  autoplay: false,
  franchiseHistory: [],
  relationships: {}, // from relationships.js
};

// Generate unique character IDs
function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

// Setup the cast with random names and archetypes
function setupCast() {
  gameState.movieTitle = document.getElementById("movie-title").value.trim() || "Untitled Horror";
  gameState.releaseYear = parseInt(document.getElementById("movie-year").value) || 2025;
  gameState.gameMode = document.getElementById("game-mode").value;
  gameState.castSize = parseInt(document.getElementById("cast-size").value);
  const killerCountVal = document.getElementById("killer-count").value;
  gameState.killerCount = killerCountVal === "random" ? Math.floor(Math.random() * 3) + 1 : parseInt(killerCountVal);

  gameState.cast = [];
  const usedNames = new Set();

  for (let i = 0; i < gameState.castSize; i++) {
    let name;
    do {
      name = names[Math.floor(Math.random() * names.length)];
    } while (usedNames.has(name));
    usedNames.add(name);

    const archetype = archetypes[Math.floor(Math.random() * archetypes.length)];

    gameState.cast.push({
      id: generateId(),
      name,
      archetype: archetype.name,
      description: archetype.description,
      stats: {...archetype.stats},
      survivalChance: archetype.baseChance || 50,
      isKiller: false,
      alive: true,
      killedBy: null,
      actsSurvived: 0,
    });
  }

  assignKillers();
  displayCastCustomization();
}

// Randomly assign killers
function assignKillers() {
  const shuffled = [...gameState.cast].sort(() => Math.random() - 0.5);
  for (let i = 0; i < gameState.killerCount; i++) {
    shuffled[i].isKiller = true;
  }
}

// Show cast customization UI
function displayCastCustomization() {
  document.getElementById("setup-screen").classList.add("hidden");
  document.getElementById("cast-customization").classList.remove("hidden");

  const container = document.getElementById("cast-container");
  container.innerHTML = "";

  gameState.cast.forEach(character => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `
      <div class="character-header">
        <div class="character-avatar">${character.name[0]}</div>
        <div class="character-info">
          <h3>${character.name}</h3>
          <div class="archetype">${character.archetype}</div>
          <div class="description">${character.description}</div>
        </div>
      </div>
      <div class="stats-grid">
        ${Object.entries(character.stats).map(([stat, value]) => `
          <div class="stat">
            <div class="stat-label">${stat.charAt(0).toUpperCase() + stat.slice(1)}</div>
            <div class="stat-bar"><div class="stat-fill" style="width:${value * 10}%"></div></div>
          </div>
        `).join("")}
      </div>
      <div class="survival-chance">Survival Chance: ${character.survivalChance}%</div>
    `;
    container.appendChild(card);
  });

  document.getElementById("relationship-setup").classList.remove("hidden");
  renderRelationshipPairs();
}

// Start the movie simulation
function startMovie() {
  document.getElementById("cast-customization").classList.add("hidden");
  document.getElementById("movie-screen").classList.remove("hidden");

  document.getElementById("current-movie-title").textContent = `${gameState.movieTitle} (${gameState.releaseYear})`;

  gameState.currentAct = 1;
  gameState.currentScene = 0;
  gameState.autoplay = false;

  updateMovieLog("The horror begins...");

  updateCastStatusUI();
  updateProgressBar();
  updateCurrentActDisplay();

  if (gameState.gameMode === "killer") {
    setupKillerControls();
  }
}

// Continue story progression
function continueStory() {
  gameState.currentScene++;

  // TODO: Add story progression logic, events, killer actions, etc.

  updateMovieLog(`Scene ${gameState.currentScene} progresses...`);

  updateCastStatusUI();
  updateProgressBar();
  updateCurrentActDisplay();

  if (gameState.currentScene >= 10) {
    gameState.currentAct++;
    gameState.currentScene = 0;

    if (gameState.currentAct > 3) {
      endMovie();
      return;
    } else {
      updateMovieLog(`Act ${gameState.currentAct} begins.`);
      updateCurrentActDisplay();
    }
  }

  if (gameState.autoplay) {
    setTimeout(continueStory, 1500);
  }
}

// Update movie log display
function updateMovieLog(message) {
  const log = document.getElementById("movie-log");
  const eventDiv = document.createElement("div");
  eventDiv.className = "event";
  eventDiv.textContent = message;
  log.appendChild(eventDiv);
  log.scrollTop = log.scrollHeight;
}

// Update progress bar UI
function updateProgressBar() {
  const progressFill = document.getElementById("movie-progress");
  const totalScenes = 3 * 10; // 3 acts, 10 scenes each
  const currentProgress = ((gameState.currentAct - 1) * 10 + gameState.currentScene) / totalScenes;
  progressFill.style.width = `${(currentProgress * 100).toFixed(2)}%`;
}

// Update current act display
function updateCurrentActDisplay() {
  const actDisplay = document.getElementById("current-act-display");
  actDisplay.textContent = `Act ${gameState.currentAct}`;
}

// Update cast status UI grid
function updateCastStatusUI() {
  const castGrid = document.getElementById("cast-grid-status");
  castGrid.innerHTML = "";
  gameState.cast.forEach(character => {
    const charDiv = document.createElement("div");
    charDiv.textContent = character.name + (character.alive ? " (Alive)" : " (Dead)");
    charDiv.className = character.alive ? "status-alive" : "status-dead";
    castGrid.appendChild(charDiv);
  });
}

// Setup killer controls UI
function setupKillerControls() {
  const killerControls = document.getElementById("killer-controls");
  killerControls.classList.remove("hidden");
  // TODO: Add killer controls rendering logic here
}

// Force killer action
function forceKillerAction() {
  updateMovieLog("Killer takes a brutal action!");
  // TODO: Implement killer action logic here
}

// Toggle autoplay on/off
function toggleAutoplay() {
  gameState.autoplay = !gameState.autoplay;
  const autoplayBtn = document.getElementById("autoplay-btn");
  autoplayBtn.textContent = gameState.autoplay ? "Disable Autoplay" : "Enable Autoplay";

  if (gameState.autoplay) {
    continueStory();
  }
}

// Skip to end of movie
function skipToEnd() {
  gameState.currentAct = 4; // Beyond last act
  endMovie();
}

// End movie and show results
function endMovie() {
  updateMovieLog("The horror ends...");
  document.getElementById("movie-screen").classList.add("hidden");
  document.getElementById("results-screen").classList.remove("hidden");
  populateFinalResults();
}

// Populate final results tables
function populateFinalResults() {
  const bodyTbody = document.getElementById("final-body-tbody");
  bodyTbody.innerHTML = "";
  gameState.cast.forEach(char => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${char.name}</td>
      <td>${char.archetype}</td>
      <td>${char.actsSurvived >= 1 ? "Alive" : "Dead"}</td>
      <td>${char.actsSurvived >= 2 ? "Alive" : "Dead"}</td>
      <td>${char.actsSurvived >= 3 ? "Alive" : "Dead"}</td>
      <td>${char.alive ? "Survived" : "Dead"}</td>
      <td>${char.killedBy || "N/A"}</td>
    `;
    bodyTbody.appendChild(row);
  });

  // TODO: Populate Edgic and Franchise History tables similarly
}

// Create sequel placeholder
function createSequel() {
  alert("Sequel creation coming soon!");
  // TODO: Implement sequel creation and franchise tracking logic
}

// Reset simulator to initial state
function resetSimulator() {
  location.reload();
}

// Flash screen for dramatic effect
function flashScreen() {
  const body = document.body;
  body.style.backgroundColor = "#ff0000";
  setTimeout(() => {
    body.style.backgroundColor = "";
  }, 150);
}
