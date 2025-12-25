/* ===============================
   GLOBAL STATE
================================ */
let isTyping = false;
let typingTimeouts = [];

/* ===============================
   COOKIE OPEN / CLOSE
================================ */
const lid = document.getElementById("lid");
const btn = document.getElementById("toggle-btn");
const message = document.getElementById("message");
const music = document.getElementById("bg-music");

btn.addEventListener("click", () => {
  lid.classList.toggle("open");

  if (lid.classList.contains("open")) {
    btn.textContent = "CLOSE";
    message.classList.add("show");

    music.currentTime = 8;
    music.volume = 0.4;
    music.play().catch(() => {});
  } else {
    btn.textContent = "OPEN";
    message.classList.remove("show");
    music.pause();
  }
});

/* ===============================
   MODALS
================================ */
function openModal(id) {
  document.getElementById(id).classList.add("show");
}

function closeModal() {
  clearTyping();
  document.querySelectorAll(".modal").forEach(modal =>
    modal.classList.remove("show")
  );
}

/* ===============================
   RELATIONSHIP TIMER
================================ */
function updateTimer() {
  const startDate = new Date("2025-03-03T00:00:00");
  const now = new Date();
  let diff = now - startDate;
  if (diff < 0) diff = 0;

  const msInYear = 365.25 * 24 * 60 * 60 * 1000;
  const msInMonth = 30.44 * 24 * 60 * 60 * 1000;
  const msInDay = 24 * 60 * 60 * 1000;
  const msInHour = 60 * 60 * 1000;
  const msInMinute = 60 * 1000;
  const msInSecond = 1000;

  let years = Math.floor(diff / msInYear);
  diff -= years * msInYear;

  let months = Math.floor(diff / msInMonth);
  diff -= months * msInMonth;

  let days = Math.floor(diff / msInDay);
  diff -= days * msInDay;

  let hours = Math.floor(diff / msInHour);
  diff -= hours * msInHour;

  let minutes = Math.floor(diff / msInMinute);
  diff -= minutes * msInMinute;

  let seconds = Math.floor(diff / msInSecond);

  const line1 =
    (years > 0 ? years + " years, " : "") +
    months + " months, " +
    days + " days";
  const line2 = hours + " hours, " + minutes + " minutes";
  const line3 = seconds + " seconds";

  document.getElementById("timeTogether").textContent =
    line1 + "\n" + line2 + "\n" + line3;
}

setInterval(updateTimer, 1000);
updateTimer();

/* ===============================
   MEMORY CAROUSEL
================================ */
const memories = [
  { img: "images/img1.jpg", text: "Teasing each other and laughing together 🤭😂" },
  { img: "images/img2.png", text: "You giving me your time, even when you're busy ⏰❤️" },
  { img: "images/img3.png", text: "The night you sang for me for the first time 🎶🥹" },
  { img: "images/img4.jpg", text: "😘" },
  { img: "images/img5.jpg", text: "Falling asleep together 🌙💤" },
  { img: "images/img6.jpg", text: "I love you, Tony ❤️" }
];

let currentIndex = 0;

function updateCarousel() {
  document.getElementById("carouselImage").src = memories[currentIndex].img;
  document.getElementById("carouselCaption").textContent =
    memories[currentIndex].text;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % memories.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + memories.length) % memories.length;
  updateCarousel();
}

/* ===============================
   TYPEWRITER – THINGS I LOVE
================================ */
const thingsILoveList = [ 
  "• How handsome you are", 
  "• Your voice that melts my heart", 
  "• Your playful and charming side", 
  "• Your infinite patience", 
  "• Your dedication as a provider and hardworking", 
  "• How amazing you are as a father", 
  "• How you are a loyal and true friend", 
  "• Your super romantic gestures", 
  "• The way you show your love every single day",
   "• The thoughtful gifts and flowers you give me", 
   "• How you can effortlessly make me laugh", 
   "• And everything about you that makes my heart feel full" ];
const titleContainer = document.getElementById("loveTitle");
const listContainer = document.getElementById("typewriterList");

function typeWriterLine(text, callback, speed = 80) {
  let i = 0;

  function typeChar() {
    if (!isTyping) return;

    if (i < text.length) {
      listContainer.textContent += text[i++];
      typingTimeouts.push(setTimeout(typeChar, speed));
    } else {
      listContainer.textContent += "\n";
      if (callback) callback();
    }
  }

  typeChar();
}

function typeList(index = 0) {
  if (!isTyping || index >= thingsILoveList.length) return;

  typeWriterLine(thingsILoveList[index], () => {
    typingTimeouts.push(
      setTimeout(() => typeList(index + 1), 300)
    );
  });
}

function typeTitle(text, callback) {
  let i = 0;

  function typeChar() {
    if (!isTyping) return;

    if (i < text.length) {
      titleContainer.textContent += text[i++];
      typingTimeouts.push(setTimeout(typeChar, 120));
    } else {
      if (callback) callback();
    }
  }

  typeChar();
}

function openThingsILoveModal() {
  clearTyping();
  isTyping = true;

  titleContainer.textContent = "";
  listContainer.textContent = "";

  document.getElementById("thingsILove").classList.add("show");

  typeTitle("Things I Love About You", () => {
    typeList();
  });
}

function clearTyping() {
  isTyping = false;
  typingTimeouts.forEach(t => clearTimeout(t));
  typingTimeouts = [];
}
