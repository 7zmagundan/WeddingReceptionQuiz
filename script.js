const quizData = [
  {
    question: "ドジャース大谷選手と新郎はどちらの方が身長高い？",
    A: "新郎",
    B: "大谷選手"
  },
  {
    question: "新婦が思う新郎の意外なところは？",
    A: "驚いたときは結構大きい声が出る",
    B: "料理がうまい"
  },
  {
    question: "新郎はけん玉チャレンジ成功する？",
    A: "成功",
    B: "失敗"
  }
];

let current = 0;
let playerName = "";
let userAnswers = [];

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id !== "page-result") {
    const petal = document.getElementById("petal-container");
    const gold = document.getElementById("gold-container");
    if (petal) petal.innerHTML = "";
    if (gold) gold.innerHTML = "";
  }
}

// ホーム → クイズ開始
document.getElementById("start-btn").addEventListener("click", () => {
  playerName = document.getElementById("player-name").value.trim();
  if (!playerName) {
    alert("名前を入力してね");
    return;
  }
  current = 0;
  userAnswers = [];
  loadQuiz();
  showPage("page-quiz");
});

// クイズ読み込み
function loadQuiz() {
  const q = quizData[current];
  const questionEl = document.getElementById("quiz-question");
  const badgeEl = document.getElementById("quiz-badge");

  questionEl.textContent = q.question;
  document.getElementById("choiceA").textContent = q.A;
  document.getElementById("choiceB").textContent = q.B;

  badgeEl.textContent = `第 ${current + 1} / ${quizData.length} 問`;
}

// 回答処理
document.querySelectorAll(".choice-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    userAnswers[current] = btn.dataset.choice;

    if (current < quizData.length - 1) {
      current++;
      loadQuiz();
    } else {
      showCheckPage();
    }
  });
});

// 回答確認ページ
function showCheckPage() {
  const list = document.getElementById("answer-list");
  list.innerHTML = "";

  quizData.forEach((q, i) => {
    const choice = userAnswers[i];
    const choiceText = q[choice];

    const block = document.createElement("div");
    block.className = "answer-block";
    block.innerHTML = `
      <div class="answer-question-label">第${i + 1}問</div>
      <div class="answer-question-text">${q.question}</div>
      <div>
        <span class="answer-your-label">あなたの回答：</span>
        <span class="answer-your-text">${choiceText}</span>
      </div>
    `;
    list.appendChild(block);
  });

  showPage("page-check");
}

// 最初からやり直す
document.getElementById("restart-btn").addEventListener("click", () => {
  current = 0;
  userAnswers = [];
  loadQuiz();
  showPage("page-quiz");
});

// 結果ページへ
document.getElementById("to-result-btn").addEventListener("click", () => {
  showResult();
  history.pushState(null, null, location.href);
});

window.addEventListener("popstate", () => {
  history.pushState(null, null, location.href);
});

// 花びら生成
function createPetals() {
  const container = document.getElementById("petal-container");
  if (!container) return;
  container.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 4 + Math.random() * 3 + "s";
    petal.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(petal);
  }
}

// 金箔生成
function createGold() {
  const container = document.getElementById("gold-container");
  if (!container) return;
  container.innerHTML = "";

  for (let i = 0; i < 35; i++) {
    const gold = document.createElement("div");
    gold.className = "gold";
    gold.style.left = Math.random() * 100 + "vw";
    gold.style.animationDuration = 3 + Math.random() * 2 + "s";
    gold.style.animationDelay = Math.random() * 1.5 + "s";
    gold.style.transform = `rotate(${Math.random() * 180}deg)`;
    container.appendChild(gold);
  }
}

// 結果表示
function showResult() {
  const card = document.getElementById("result-card");
  const flowerLabel = document.getElementById("flower-label");

  card.classList.remove("theme-yellow", "theme-red", "theme-blue");
  flowerLabel.classList.remove("label-yellow", "label-red", "label-blue");

  const [q1, q2, q3] = userAnswers;

  if (q1 === "B" && q2 === "B" && q3 === "A") {
    card.classList.add("theme-yellow");
    flowerLabel.textContent = "ガーベラ";
    flowerLabel.classList.add("label-yellow");
  } else if (q1 === "B" && q2 === "B" && q3 === "B") {
    card.classList.add("theme-red");
    flowerLabel.textContent = "カーネーション";
    flowerLabel.classList.add("label-red");
  } else {
    card.classList.add("theme-blue");
    flowerLabel.textContent = "ブルースター";
    flowerLabel.classList.add("label-blue");
  }

  document.getElementById("result-message").textContent =
    `${playerName} さん、クイズにご協力いただきありがとうございました。` +
    ` 今日の楽しい時間を一緒に盛り上げてくださり、とても嬉しいです。`;

  createPetals();
  createGold();
  showPage("page-result");
}
