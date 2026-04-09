// クイズデータ
const quizData = [
  {
    question: "新郎が初めて新婦に作った料理は？",
    A: "オムライス",
    B: "カレー",
    correct: "A"
  },
  {
    question: "2人が初めて旅行した場所は？",
    A: "北海道",
    B: "沖縄",
    correct: "B"
  },
  {
    question: "プロポーズの場所は？",
    A: "夜景の見える公園",
    B: "自宅",
    correct: "A"
  }
];

let current = 0;
let score = 0;
let playerName = "";

// ページ切り替え
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ホーム → クイズ開始
document.getElementById("start-btn").addEventListener("click", () => {
  playerName = document.getElementById("player-name").value.trim();
  if (playerName === "") {
    alert("名前を入力してね");
    return;
  }
  current = 0;
  score = 0;
  loadQuiz();
  showPage("page-quiz");
});

// クイズ読み込み
function loadQuiz() {
  const q = quizData[current];
  document.getElementById("quiz-question").textContent = q.question;
  document.getElementById("choiceA").textContent = q.A;
  document.getElementById("choiceB").textContent = q.B;
  document.getElementById("quiz-progress").textContent = `第 ${current + 1} / ${quizData.length} 問`;
}

// 回答処理
document.querySelectorAll(".choice-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const choice = btn.dataset.choice;
    if (choice === quizData[current].correct) score++;

    current++;
    if (current < quizData.length) {
      loadQuiz();
    } else {
      showResult();
    }
  });
});

// 結果表示
function showResult() {
  document.getElementById("result-name").textContent = `${playerName} さんの結果`;
  document.getElementById("result-score").textContent = `正解数：${score} / ${quizData.length}`;
  showPage("page-result");
}

// リスタート
document.getElementById("restart-btn").addEventListener("click", () => {
  showPage("page-home");
});
