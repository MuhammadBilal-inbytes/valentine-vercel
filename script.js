// ---------- confetti burst ----------
const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

const confettiColors = ["#FF3D8A", "#FFDD4A", "#6EE7C0", "#C9B8FF", "#A3E8FF"];

function burstConfetti() {
  const pieces = Array.from({ length: 120 }, () => ({
    x: confettiCanvas.width / 2,
    y: confettiCanvas.height / 3,
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -12 - 4,
    size: Math.random() * 8 + 4,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 20,
    life: 0,
  }));

  const gravity = 0.35;
  const maxLife = 130;

  function frame() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let alive = false;

    pieces.forEach((p) => {
      if (p.life > maxLife) return;
      alive = true;
      p.vy += gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      p.life += 1;

      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - p.life / maxLife);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    if (alive) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }

  requestAnimationFrame(frame);
}

// ---------- note reveal ----------
const note = document.getElementById("note");
const noteText = note.querySelector(".note-text");

const messageLines = [
  "okay funny stuff first, real talk after 😭",
  "",
  "you spam \"ma dumb aaa😭😭😭😭😭\" more than any",
  "human alive, and somehow still ace maths, forget",
  "NOR gates exist, and out-argue literally everyone.",
  "make it make sense",
  "",
  "also the second I say ONE thing wrong you go",
  "straight to \"Muhammad Bilal grow up\" like my own",
  "mother. scary. respect it tho",
  "",
  "remember the 200rs rickshaw era? \"young dumb\" era?",
  "ngl we peaked that day",
  "",
  "okay fr now: for someone who calls herself dumb",
  "every single day, you've quietly been one of the",
  "best parts of this whole year, no cap",
  "",
  "happy (almost) birthday, certified icon and",
  "24/7 self-proclaimed dumb genius 😭🎂",
  "",
  "go check ur email, wrote u something there too 👀",
].join("\n");

function revealNote() {
  noteText.textContent = messageLines;
  note.hidden = false;
  requestAnimationFrame(() => note.classList.add("show"));
  note.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ---------- quiz + note + email flow ----------
const button = document.getElementById("valentinesButton");
const quiz = document.getElementById("quiz");
const quizFeedback = quiz.querySelector(".quiz-feedback");
const quizOptions = quiz.querySelectorAll(".quiz-option");
const CORRECT_ANSWER = "16";

let emailSent = false;

button.addEventListener("click", () => {
  if (button.textContent === "unwrap ur bday msg 🎁") {
    quiz.hidden = false;
    button.textContent = "answer to unlock 👇";
    button.disabled = true;
    quiz.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

async function sendBirthdayEmail() {
  if (emailSent) return;
  emailSent = true;
  try {
    const response = await fetch('/api/send-mail', { method: 'GET' });
    const text = await response.text();
    const success = response.ok && text.trim().toLowerCase().includes('message has been sent');

    if (success) {
      console.log('Send mail success:', text);
      button.textContent = "check ur email 🎂";
    } else {
      console.error('Failed to send email', response.status, text);
      button.textContent = "oops, error 😞";
      alert('Error sending email:\n' + text);
    }
  } catch (error) {
    console.error('Network or other error:', error);
    button.textContent = "oops, error 😞";
    alert('Network error: ' + (error && error.message ? error.message : error));
  }
}

quizOptions.forEach((opt) => {
  opt.addEventListener("click", async () => {
    if (opt.dataset.value === CORRECT_ANSWER) {
      quizOptions.forEach((o) => (o.disabled = true));
      opt.classList.add("correct");
      quizFeedback.textContent = "✅ correct! ur a genius fr, sending ur gift... 🎁";

      burstConfetti();
      revealNote();
      button.textContent = "sending...";
      await sendBirthdayEmail();
    } else {
      opt.classList.add("wrong");
      quiz.classList.remove("shake");
      void quiz.offsetWidth; // restart animation
      quiz.classList.add("shake");
      quizFeedback.textContent = "❌ not quite bestie, try again";
    }
  });
});