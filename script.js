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
let answerTime = "";

/* ------------------------------
   ページ切り替え
------------------------------ */
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

/* ------------------------------
   ホーム → クイズ開始
------------------------------ */
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

/* ------------------------------
   クイズ読み込み
------------------------------ */
function loadQuiz() {
  const q = quizData[current];
  document.getElementById("quiz-question").textContent = q.question;
  document.getElementById("choiceA").textContent = q.A;
  document.getElementById("choiceB").textContent = q.B;

  document.getElementById("quiz-badge").textContent =
    `第 ${current + 1} / ${quizData.length} 問`;
}

/* ------------------------------
   回答処理
------------------------------ */
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

/* ------------------------------
   回答確認ページ
------------------------------ */
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

/* ------------------------------
   最初からやり直す
------------------------------ */
document.getElementById("restart-btn").addEventListener("click", () => {
  current = 0;
  userAnswers = [];
  loadQuiz();
  showPage("page-quiz");
});

/* ------------------------------
   結果ページへ
------------------------------ */
document.getElementById("to-result-btn").addEventListener("click", () => {

  // ★ 可愛い日時フォーマット
  const now = new Date();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const w = weekdays[now.getDay()];

  answerTime =
    `${now.getFullYear()}.` +
    `${String(now.getMonth()+1).padStart(2,"0")}.` +
    `${String(now.getDate()).padStart(2,"0")}（${w}） ` +
    `${String(now.getHours()).padStart(2,"0")}:` +
    `${String(now.getMinutes()).padStart(2,"0")}`;

  showResult();
  history.pushState(null, null, location.href);
});

window.addEventListener("popstate", () => {
  history.pushState(null, null, location.href);
});

/* ------------------------------
   花びら生成
------------------------------ */
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

/* ------------------------------
   金箔生成
------------------------------ */
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

/* ------------------------------
   結果表示
------------------------------ */
function showResult() {
  const flowerLabel = document.getElementById("flower-label");
  const badge = document.getElementById("flower-badge");
  const resultInner = document.querySelector(".result-inner");
  const capture = document.getElementById("result-capture-area");

  resultInner.classList.remove("result-yellow", "result-red", "result-blue");
  badge.classList.remove("badge-yellow", "badge-red", "badge-blue");

  const [q1, q2, q3] = userAnswers;
  const photo = document.getElementById("photo-slot");

  /* ------------------------------
     ★ 背景色をキャプチャ範囲に完全コピー
     （単色 + グラデーションの二重付与）
  ------------------------------ */

  /* 黄色（ガーベラ） */
  if (q1 === "B" && q2 === "B" && q3 === "A") {
    badge.classList.add("badge-yellow");
    resultInner.classList.add("result-yellow");
    flowerLabel.textContent = "ガーベラ";

    capture.style.background = "#fff8d1";
    capture.style.backgroundImage =
      "linear-gradient(180deg, #fff8d1, #ffe89a)";

    // ★ 写真セット
    photo.style.backgroundImage = "url('./assets/images/img_result-yellow.jpg')";

  /* 赤（カーネーション） */
  } else if (q1 === "B" && q2 === "B" && q3 === "B") {
    badge.classList.add("badge-red");
    resultInner.classList.add("result-red");
    flowerLabel.textContent = "カーネーション";

    capture.style.background = "#ffe5e5";
    capture.style.backgroundImage =
      "linear-gradient(180deg, #ffe5e5, #ffb3b3)";

    // ★ 写真セット
    photo.style.backgroundImage = "url('./assets/images/img_result-red.jpg')";

  /* 青（ブルースター） */
  } else {
    badge.classList.add("badge-blue");
    resultInner.classList.add("result-blue");
    flowerLabel.textContent = "ブルースター";

    capture.style.background = "#e6f3ff";
    capture.style.backgroundImage =
      "linear-gradient(180deg, #e6f3ff, #bcdcff)";

    // ★ 写真セット
    photo.style.backgroundImage = "url('./assets/images/img_result-blue.jpg')";
  }

  document.getElementById("result-message").textContent =
    `${playerName} さん\nクイズにご協力いただきありがとうございました。\n` +
    ` 皆さまの回答をもとに\n余興で楽しく答え合わせを行います。\n` +
    ` どうぞ楽しみにしていてください。`;

  document.getElementById("result-time").textContent =
    `回答日時：${answerTime}`;

  createPetals();
  createGold();
  showPage("page-result");
}

/* ------------------------------
   画像保存（html2canvas）
------------------------------ */
document.getElementById("save-image-btn").addEventListener("click", () => {
  const target = document.getElementById("result-capture-area");

  html2canvas(target, {
    scale: 2,
    backgroundColor: null  // ← 透明補正を無効化
  }).then(canvas => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "quiz_result.png";
    link.click();
  });
});
