let questions = [];
let currentIndex = 0;
let countdown = 5;
let timer;

const questionElem = document.getElementById("question");
const countdownElem = document.getElementById("countdown");
const answerElem = document.getElementById("answer");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");

// JSON読み込み
fetch("questions.json")
  .then((res) => res.json())
  .then((data) => {
    questions = data;
  });

// スタートボタン
startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  currentIndex = 0;
  showQuestion();
});

function showQuestion() {
  if (currentIndex >= questions.length) {
    questionElem.textContent = "全問終了！";
    countdownElem.textContent = "";
    answerElem.textContent = "";
    startBtn.classList.remove("hidden");
    startBtn.textContent = "もう一度";
    return;
  }

  const q = questions[currentIndex];
  questionElem.textContent = q.question;
  answerElem.classList.add("hidden");
  countdown = 5;
  countdownElem.textContent = countdown;

  timer = setInterval(() => {
    countdown--;
    countdownElem.textContent = countdown;
    if (countdown === 0) {
      clearInterval(timer);
      showAnswer();
    }
  }, 1000);
}

function showAnswer() {
  const q = questions[currentIndex];
  answerElem.textContent = "答え：" + q.answer;
  answerElem.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  nextBtn.classList.add("hidden");
  showQuestion();
});
