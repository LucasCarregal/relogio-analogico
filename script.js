const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

const calendarEl = document.getElementById("calendar");
const digitalEl = document.getElementById("digital");

const clock = document.getElementById("clock");
const marks = document.getElementById("marks");

createClockNumbers(12);
createClockMarks();

loop();
// setInterval(updateClock, 1000);

function createClockNumbers(totalNumbers) {
  for (let i = 1; i <= totalNumbers; i++) {
    const n = document.createElement("div");
    n.className = "num";
    n.textContent = i;

    const angle = (i * 360) / totalNumbers;
    n.style.setProperty("--angle", `${angle}deg`);

    clock.appendChild(n);
  }
}

function createClockMarks() {
  for (let i = 0; i < 60; i++) {
    const mark = document.createElement("div");

    const angle = i * 6; // 360 / 60

    mark.className = "mark " + (i % 5 === 0 ? "big" : "small");
    mark.style.transform = `translate(-50%, -100%) rotate(${angle}deg) translateY(-150px)`;

    marks.appendChild(mark);
  }
}

function loop() {
  updateClock();

  requestAnimationFrame(loop);
}

function updateClock() {
  const now = new Date();

  const milliseconds = now.getMilliseconds();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  // Horário digital
  const HH = String(hours).padStart(2, "0");
  const MM = String(minutes).padStart(2, "0");
  const SS = String(seconds).padStart(2, "0");
  digitalEl.textContent = `${HH}:${MM}:${SS}`;

  // calendario digital
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  const yy = String(year).slice(-2);
  calendarEl.textContent = `${dd}/${mm}/${yy}`;

  const s = seconds + milliseconds / 1000;
  const m = minutes + s / 60;
  const h = (hours % 12) + m / 60;

  const secondDeg = s * 6; // 360/60
  const minuteDeg = m * 6; // 360/60
  const hourDeg = h * 30; // 360/12

  secondEl.style.transform = `translate(-50%, -100%) rotate(${secondDeg}deg)`;
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;
  hourEl.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
}
