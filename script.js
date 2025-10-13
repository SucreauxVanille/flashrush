// script.js（IDは start-btn / next-btn をそのまま使用）
let questions = [];
let countdown = 5;
let timer = null;

// 要素取得（IDは変更しない）
const questionElem = document.getElementById("question");
const countdownElem = document.getElementById("countdown");
const answerElem = document.getElementById("answer");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");

// 問題JSONを読み込む（エラー時はコンソールに出力）
fetch("questions.json")
  .then((res) => {
    if (!res.ok) throw new Error("questions.json の読み込みに失敗しました");
    return res.json();
  })
  .then((data) => {
    if (!Array.isArray(data)) throw new Error("questions.json の形式が配列ではありません");
    questions = data;
  })
  .catch((err) => {
    console.error(err);
    questionElem.textContent = "問題データの読み込みに失敗しました（コンソールを確認）";
  });

// start ボタンクリック
startBtn.addEventListener("click", () => {
  // 問題がない場合は開始しない
  if (!questions || questions.length === 0) {
    questionElem.textContent = "問題が読み込まれていません。questions.json を確認してください。";
    return;
  }

  // UI 初期化
  startBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  answerElem.classList.add("hidden");

  // 最初の問題を表示
  showQuestion();
});

function showQuestion() {
  // 問題配列が空なら中断（念のため）
  if (!questions || questions.length === 0) {
    questionElem.textContent = "問題がありません。";
    countdownElem.textContent = "";
    answerElem.textContent = "";
    startBtn.classList.remove("hidden");
    return;
  }

  // ランダムに問題を選択（リピート可）
  const randomIndex = Math.floor(Math.random() * questions.length);
  const q = questions[randomIndex];

  // 表示リセット
  questionElem.textContent = q.question || "（問題が空です）";
  answerElem.textContent = "";
  answerElem.classList.add("hidden");
  nextBtn.classList.add("hidden");

  // カウントダウン初期化（ここで5秒を設定、必要なら可変に変更可能）
  countdown = 5;
  countdownElem.textContent = countdown;

  // 既存タイマーがあればクリア（多重起動防止）
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  // 1秒ごとのカウントダウン
  timer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      countdownElem.textContent = countdown;
    } else {
      // 0になった瞬間に表示を消して答えを出す
      clearInterval(timer);
      timer = null;
      countdownElem.textContent = ""; // 「0」を表示しない
      showAnswer(q);
    }
  }, 1000);
}

function showAnswer(q) {
  answerElem.textContent = "答え： " + (q.answer || "（答えが設定されていません）");
  answerElem.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

// next ボタンクリック -> 次の（ランダム）問題を表示
nextBtn.addEventListener("click", () => {
  nextBtn.classList.add("hidden");
  answerElem.classList.add("hidden");

  // 万が一残っているタイマーをクリア
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  // すぐ次の問題へ（ランダム∞モード）
  showQuestion();
});
