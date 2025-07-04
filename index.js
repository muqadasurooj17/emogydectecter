const emojis = document.querySelectorAll('.emoji');
const moodHistory = document.getElementById('mood-history');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const saveMoodBtn = document.getElementById('saveMoodBtn');
const savedMoodDisplay = document.getElementById('savedMood');

let lastSelectedMood = null;

// Load saved moods on page load
window.onload = () => {
  const savedMoods = JSON.parse(localStorage.getItem('moodTracker')) || [];
  const savedMood = localStorage.getItem('savedMood');

  renderMoods(savedMoods);

  if (savedMood) {
    savedMoodDisplay.textContent = savedMood;
  }
};

// Handle emoji click
emojis.forEach(emoji => {
  emoji.addEventListener('click', () => {
    const mood = emoji.textContent;
    const time = new Date().toLocaleString();
    const moodEntry = { mood, time };

    lastSelectedMood = mood;

    let savedMoods = JSON.parse(localStorage.getItem('moodTracker')) || [];
    savedMoods.unshift(moodEntry);
    localStorage.setItem('moodTracker', JSON.stringify(savedMoods));

    renderMoods(savedMoods);
  });
});

// Save current mood
saveMoodBtn.addEventListener('click', () => {
  if (lastSelectedMood) {
    localStorage.setItem('savedMood', lastSelectedMood);
    savedMoodDisplay.textContent = lastSelectedMood;
    alert("Mood saved!");
  } else {
    alert("Please select a mood first!");
  }
});

// Clear history
clearHistoryBtn.addEventListener('click', () => {
  localStorage.removeItem('moodTracker');
  moodHistory.innerHTML = '';
});

// Render mood history
function renderMoods(moods) {
  moodHistory.innerHTML = '';
  moods.slice(0, 10).forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.mood} - ${entry.time}`;
    moodHistory.appendChild(li);
  });
}
