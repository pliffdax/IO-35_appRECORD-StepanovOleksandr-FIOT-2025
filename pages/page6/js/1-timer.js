const startBtn = document.querySelector("[data-start]");
const datetimeInput = document.querySelector("#datetime-picker");

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let selectedDate = null;
let timerId = null;

startBtn.disabled = true;

// Налаштування flatpickr
flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = selectedDates[0];

    if (!date) {
      startBtn.disabled = true;
      return;
    }

    if (date <= new Date()) {
      iziToast.error({
        title: "Помилка",
        message: "Please choose a date in the future",
        position: "topRight"
      });
      startBtn.disabled = true;
      return;
    }

    selectedDate = date;
    startBtn.disabled = false;
  }
});

startBtn.addEventListener("click", onStart);

function onStart() {
  if (!selectedDate) {
    return;
  }

  startBtn.disabled = true;
  datetimeInput.disabled = true;

  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(() => {
    const now = Date.now();
    const diff = selectedDate - now;

    if (diff <= 0) {
      clearInterval(timerId);
      timerId = null;
      updateTimerDisplay(0);
      datetimeInput.disabled = false;
      return;
    }

    updateTimerDisplay(diff);
  }, 1000);
}

function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
