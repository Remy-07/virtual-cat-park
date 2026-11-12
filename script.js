/* ============================================================
   Virtual Cat Park - script.js
   This file controls behaviour only: what happens when the
   visitor adopts a cat, feeds it, or plays with it.

   Round 2 keeps everything in memory. Saving the cat so it
   survives a page refresh is added in the next round.
   ============================================================ */

"use strict";

/* ---------- 1. Constants (the rules of the game) ---------- */

const MAX_NAME_LENGTH = 20;
const START_DAY = 1;
const START_HAPPINESS = 50;
const FEED_GAIN = 10;
const PLAY_GAIN = 10;
const HAPPINESS_MAX = 100;
const HAPPINESS_MIN = 0;

/* ---------- 2. Element references ---------- */

const adoptionForm = document.getElementById("adoption-form");
const nameInput = document.getElementById("cat-name");
const breedSelect = document.getElementById("cat-breed");
const formMessage = document.getElementById("form-message");

const dashboard = document.getElementById("cat-dashboard");
const statName = document.getElementById("stat-name");
const statBreed = document.getElementById("stat-breed");
const statDay = document.getElementById("stat-day");
const statStage = document.getElementById("stat-stage");
const statHappiness = document.getElementById("stat-happiness");

const feedButton = document.getElementById("feed-button");
const playButton = document.getElementById("play-button");

/* ---------- 3. The current cat ---------- */
/* "cat" holds the cat the visitor owns right now, or null when
   nobody has been adopted yet. */

let cat = null;

/* ---------- 4. Rule functions ---------- */

/* Which growth stage belongs to this day number? */
function stageFor(day) {
  if (day <= 1) {
    return "Kitten";
  }
  if (day <= 3) {
    return "Young Cat";
  }
  return "Adult Cat";
}

/* Keep a number inside a range, so happiness can never leave 0..100. */
function clamp(value, lowest, highest) {
  return Math.min(highest, Math.max(lowest, value));
}

/* Feeding and playing both add happiness, but never past 100. */
function addHappiness(happiness, amount) {
  return clamp(happiness + amount, HAPPINESS_MIN, HAPPINESS_MAX);
}

/* ---------- 5. Showing things on the page ---------- */

/* Put a short message under the form, e.g. why a name was rejected. */
function showMessage(text) {
  formMessage.textContent = text;
}

/* Draw one cat in the dashboard. The name is set with textContent,
   so it is shown as plain text and can never be treated as HTML. */
function renderCat(catToShow) {
  statName.textContent = catToShow.name;
  statBreed.textContent = catToShow.breed;
  statDay.textContent = String(catToShow.day);
  statStage.textContent = stageFor(catToShow.day);
  statHappiness.textContent = String(catToShow.happiness);

  adoptionForm.hidden = true;
  dashboard.hidden = false;
}

/* Show the adoption form again and hide the dashboard. */
function showAdoptionForm() {
  adoptionForm.hidden = false;
  dashboard.hidden = true;
}

/* ---------- 6. Actions ---------- */

/* Adopt: check the name, build a brand new cat, show it. */
function adoptCat(event) {
  event.preventDefault();

  // trim() removes spaces at the start and at the end only.
  // Spaces inside the name are allowed to stay.
  const cleanedName = nameInput.value.trim();

  if (cleanedName === "") {
    showMessage("Please type a name before you adopt a cat.");
    return;
  }

  if (cleanedName.length > MAX_NAME_LENGTH) {
    showMessage("Please use " + MAX_NAME_LENGTH + " characters or fewer.");
    return;
  }

  showMessage("");

  cat = {
    name: cleanedName,
    breed: breedSelect.value,
    day: START_DAY,
    happiness: START_HAPPINESS
  };

  renderCat(cat);
}

/* Feed: happiness +10, then redraw. */
function feedCat() {
  if (!cat) {
    return;
  }
  cat.happiness = addHappiness(cat.happiness, FEED_GAIN);
  renderCat(cat);
}

/* Play: happiness +10, then redraw. */
function playWithCat() {
  if (!cat) {
    return;
  }
  cat.happiness = addHappiness(cat.happiness, PLAY_GAIN);
  renderCat(cat);
}

/* ---------- 7. Start the page ---------- */

adoptionForm.addEventListener("submit", adoptCat);
feedButton.addEventListener("click", feedCat);
playButton.addEventListener("click", playWithCat);

showAdoptionForm();
