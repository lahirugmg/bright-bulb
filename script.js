// Set this to the Facebook page URL. Every "Follow" button uses it.
const FACEBOOK_PAGE_URL = "https://www.facebook.com/profile.php?id=61595433115159";

const QUESTIONS = [
  { topic: "Science", q: "How many hearts does an octopus have?",
    a: "Three. Two pump blood through the gills and one pumps it around the rest of the body. Their blood is blue, too, because it carries oxygen using copper instead of iron." },
  { topic: "Science", q: "Which is longer on Venus: a day or a year?",
    a: "A day. Venus takes about 243 Earth days to spin once, but only about 225 Earth days to go around the Sun." },
  { topic: "Science", q: "Why is the sky blue?",
    a: "Sunlight contains every colour. Air molecules scatter the short blue wavelengths far more than the long red ones, so blue light reaches your eyes from every part of the sky." },
  { topic: "Technology", q: "Was the first computer bug a real bug?",
    a: "Yes. In 1947, engineers working on the Harvard Mark II found a moth stuck in a relay and taped it into their logbook as the \"first actual case of bug being found\"." },
  { topic: "Technology", q: "What did the first text message say?",
    a: "\"Merry Christmas\". Engineer Neil Papworth sent it from a computer to a mobile phone in December 1992." },
  { topic: "Nature", q: "Is a banana a berry? Is a strawberry?",
    a: "Botanically, bananas are berries and strawberries are not. A true berry grows from a single flower's ovary with seeds inside; a strawberry's seeds sit on the outside." },
  { topic: "Nature", q: "Why do sea otters hold hands?",
    a: "Resting sea otters often link paws or wrap themselves in kelp so they don't drift apart while they float and sleep." },
  { topic: "History", q: "Did Cleopatra live closer to the Great Pyramid or to the Moon landing?",
    a: "The Moon landing. The Great Pyramid of Giza was built around 2560 BCE, Cleopatra died in 30 BCE, and Apollo 11 landed in 1969." },
  { topic: "History", q: "Which is older: Oxford University or the Aztec capital Tenochtitlan?",
    a: "Oxford. Teaching there goes back to around 1096, while Tenochtitlan was founded in 1325." },
  { topic: "History", q: "Who built the fortress on top of Sigiriya, the Lion Rock in Sri Lanka?",
    a: "King Kashyapa, in the 5th century CE. He built a palace on the 200-metre rock, with gardens, pools and a giant lion gateway at its base." },
  { topic: "Ideas", q: "Was zero always a number?",
    a: "No. People used a symbol for an empty place long before, but the Indian mathematician Brahmagupta wrote rules for calculating with zero as a number in 628 CE." },
  { topic: "Ideas", q: "If you fold a piece of paper in half 42 times, how thick would it be?",
    a: "In theory, thick enough to reach the Moon. Each fold doubles the thickness, so a 0.1 mm sheet becomes about 440,000 km after 42 folds. In practice, nobody can fold paper more than about 12 times." }
];

const TOPIC_COLOUR = {
  Science: "var(--science)", Technology: "var(--technology)", Nature: "var(--nature)",
  History: "var(--history)", Ideas: "var(--ideas)"
};

const card = document.getElementById("card");
const topicEl = document.getElementById("card-topic");
const questionEl = document.getElementById("card-question");
const answerBox = document.getElementById("card-answer");
const answerEl = document.getElementById("card-answer-text");
const revealBtn = document.getElementById("reveal");
const nextBtn = document.getElementById("next");
const spines = document.querySelectorAll(".spine");

let topic = "all";
let current = -1;

function pool() {
  return QUESTIONS.map((item, i) => ({ item, i }))
    .filter(({ item }) => topic === "all" || item.topic === topic);
}

function show(index) {
  const item = QUESTIONS[index];
  current = index;
  card.style.setProperty("--c", TOPIC_COLOUR[item.topic]);
  topicEl.textContent = item.topic;
  questionEl.textContent = item.q;
  answerEl.textContent = item.a;
  answerBox.hidden = true;
  revealBtn.textContent = "Show the answer";
  revealBtn.setAttribute("aria-expanded", "false");
}

function next() {
  const options = pool().filter(({ i }) => i !== current);
  const choice = options.length ? options : pool();
  show(choice[Math.floor(Math.random() * choice.length)].i);
}

revealBtn.addEventListener("click", () => {
  const open = answerBox.hidden;
  answerBox.hidden = !open;
  revealBtn.textContent = open ? "Hide the answer" : "Show the answer";
  revealBtn.setAttribute("aria-expanded", String(open));
});

nextBtn.addEventListener("click", next);

spines.forEach((spine) => {
  spine.addEventListener("click", () => {
    topic = spine.dataset.topic;
    spines.forEach((s) => {
      const active = s === spine;
      s.classList.toggle("is-active", active);
      s.setAttribute("aria-pressed", String(active));
    });
    current = -1;
    next();
  });
});

document.querySelectorAll("[data-fb-link]").forEach((a) => { a.href = FACEBOOK_PAGE_URL; });
document.getElementById("year").textContent = new Date().getFullYear();

next();
