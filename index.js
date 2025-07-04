// DOM Elements
const emojis = document.querySelectorAll('.emoji');
const moodHistory = document.getElementById('mood-history');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const saveMoodBtn = document.getElementById('saveMoodBtn');
const savedMoodDisplay = document.getElementById('savedMood');

let lastSelectedMood = null;

// Utility function to get data from localStorage
const getLocalStorageData = (key, defaultValue = []) => {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
};

// Utility function to set data in localStorage
const setLocalStorageData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Load saved moods on page load
window.onload = () => {
  const savedMoods = getLocalStorageData('moodTracker');
  const savedMood = localStorage.getItem('savedMood');

  renderMoods(savedMoods);

  if (savedMood) {
    savedMoodDisplay.textContent = savedMood;
  }
};

// Handle emoji click
const handleEmojiClick = (emoji) => {
  const mood = emoji.textContent;
  const time = new Date().toLocaleString();
  const moodEntry = { mood, time };

  lastSelectedMood = mood;

  const savedMoods = getLocalStorageData('moodTracker');
  savedMoods.unshift(moodEntry);
  setLocalStorageData('moodTracker', savedMoods);

  renderMoods(savedMoods);
};

// Attach click event listeners to emojis
emojis.forEach((emoji) => {
  emoji.addEventListener('click', () => handleEmojiClick(emoji));
});

// Save current mood
const saveCurrentMood = () => {
  if (lastSelectedMood) {
    localStorage.setItem('savedMood', lastSelectedMood);
    savedMoodDisplay.textContent = lastSelectedMood;
    alert('Mood saved!');
  } else {
    alert('Please select a mood first!');
  }
};

// Attach click event listener to save button
saveMoodBtn.addEventListener('click', saveCurrentMood);

// Clear mood history
const clearMoodHistory = () => {
  localStorage.removeItem('moodTracker');
  moodHistory.innerHTML = '';
};

// Attach click event listener to clear history button
clearHistoryBtn.addEventListener('click', clearMoodHistory);

// Render mood history
const renderMoods = (moods) => {
  moodHistory.innerHTML = '';
  moods.slice(0, 10).forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = `${entry.mood} - ${entry.time}`;
    moodHistory.appendChild(li);
  });
};