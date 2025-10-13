let questions = [];
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
  showQuestion();
});

function showQuestion() {
  if (questions.length === 0) return;

  // ランダムな問題を選択
  const randomIndex = Math.floor(Math.random() * questions.length);
  const q = questions[randomIndex];

  // 表示リセット
  questionElem.textContent = q.question;
  answerElem.classList.add("hidden");
  countdown = 5;
  countdownElem.textContent = countdown;

  // カウントダウン開始
  clearInterval(timer);
  timer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      countdownElem.textContent = countdown;
    } else {
      clearInterval(timer);
      countdownElem.textContent = ""; // 「0」を消す
      showAnswer(q);
    }
  }, 1000);
}

function showAnswer(q) {
  answerElem.textContent = "答え：" + q.answer;
  answerElem.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  nextBtn.classList.add("hidden");
  showQuestion();
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  nextBtn.classList.add("hidden");
  showQuestion();
});
