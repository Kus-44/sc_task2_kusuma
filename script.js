let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("pause");
let resetBtn = document.getElementById("reset");
let display = document.getElementById("display");

let timer;
let [hours, minutes, seconds] = [0, 0, 0];

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.innerText = `${h}:${m}:${s}`;
}

function runTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

startBtn.onclick = () => {
  if (!timer) {
    timer = setInterval(runTimer, 1000);
  }
};

pauseBtn.onclick = () => {
  clearInterval(timer);
  timer = null;
};

resetBtn.onclick = () => {
  clearInterval(timer);
  timer = null;
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
};

// Initial display
updateDisplay();
// Sound Function
const clickSound = document.getElementById("clickSound");

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Attach sound to all buttons
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", playClick);
});

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");
let lapCount = 0;

lapBtn.addEventListener("click", () => {
  if (seconds !== 0 || minutes !== 0 || hours !== 0) {
    lapCount++;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    lapList.prepend(lapItem); // Add newest lap to top
  }
});
let timerInterval;
let remainingTime = 0;

function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  document.getElementById('timerDisplay').textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  const minInput = document.getElementById('minutes').value || 0;
  const secInput = document.getElementById('seconds').value || 0;

  if (remainingTime <= 0) {
    remainingTime = parseInt(minInput) * 60 + parseInt(secInput);
  }

  if (remainingTime <= 0) return;

  timerInterval = setInterval(() => {
    remainingTime--;
    updateTimerDisplay();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  remainingTime = 0;
  updateTimerDisplay();
}