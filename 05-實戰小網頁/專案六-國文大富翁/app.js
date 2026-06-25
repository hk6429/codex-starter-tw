// 國文大富翁 —— 題庫在 questions.js，這裡管棋盤與回合
const $ = (id) => document.getElementById(id);

// 棋盤格子：start 起點 / q 題目 / bonus 前進 / trap 後退 / end 終點
const BOARD = [
  { type: "start", label: "起點" },
  { type: "q" }, { type: "q" }, { type: "bonus", n: 2 }, { type: "q" },
  { type: "trap", n: 2 }, { type: "q" }, { type: "q" }, { type: "bonus", n: 3 },
  { type: "q" }, { type: "trap", n: 1 }, { type: "q" }, { type: "q" },
  { type: "bonus", n: 2 }, { type: "q" }, { type: "q" }, { type: "trap", n: 2 },
  { type: "q" }, { type: "q" }, { type: "bonus", n: 3 }, { type: "end", label: "終點" },
];
const TOKENS = ["🔴", "🔵", "🟢", "🟡"];
const NAMES = ["紅隊", "藍隊", "綠隊", "黃隊"];

let players = [];   // {pos, token, name}
let turn = 0;
let qIndex = 0;     // 題庫輪流指標
let busy = false;

function startGame() {
  const n = +$("playerCount").value;
  players = Array.from({ length: n }, (_, i) => ({ pos: 0, token: TOKENS[i], name: NAMES[i] }));
  turn = 0; qIndex = 0; busy = false;
  $("setupView").classList.add("hidden");
  $("gameView").classList.remove("hidden");
  $("log").innerHTML = "";
  renderAll();
  log("遊戲開始！輪到 " + cur().name);
}

const cur = () => players[turn];

function renderBoard() {
  const board = $("board");
  board.innerHTML = "";
  BOARD.forEach((tile, i) => {
    const div = document.createElement("div");
    div.className = "tile " + (tile.type === "q" ? "q" : tile.type);
    let txt = "";
    if (tile.type === "start") txt = "起點 ▶";
    else if (tile.type === "end") txt = "🏁 終點";
    else if (tile.type === "q") txt = "📖 題目";
    else if (tile.type === "bonus") txt = `前進 +${tile.n}`;
    else if (tile.type === "trap") txt = `後退 -${tile.n}`;
    div.innerHTML = `<span class="ti">${i}</span>${txt}`;
    const toks = document.createElement("div");
    toks.className = "tokens";
    players.forEach(p => { if (p.pos === i) toks.innerHTML += `<span class="token">${p.token}</span>`; });
    div.appendChild(toks);
    board.appendChild(div);
  });
}

function renderPlayers() {
  $("players").innerHTML = players.map((p, i) =>
    `<div class="pchip ${i === turn ? "active" : ""}">${p.token} ${p.name}（第 ${p.pos} 格）</div>`
  ).join("");
  $("turnInfo").textContent = `輪到：${cur().token} ${cur().name}`;
}

function renderAll() { renderBoard(); renderPlayers(); }

function log(msg) {
  const d = document.createElement("div");
  d.textContent = "• " + msg;
  $("log").prepend(d);
}

function roll() {
  if (busy) return;
  busy = true;
  const steps = Math.floor(Math.random() * 6) + 1;
  $("dice").textContent = "🎲 " + steps;
  log(`${cur().name} 擲出 ${steps}`);
  move(steps, () => landed());
}

function move(steps, done) {
  // 一格一格走，視覺上會跳動
  let left = steps;
  const tick = () => {
    if (left <= 0) { done(); return; }
    cur().pos = Math.min(cur().pos + 1, BOARD.length - 1);
    left--;
    renderAll();
    if (cur().pos === BOARD.length - 1) { done(); return; }
    setTimeout(tick, 180);
  };
  tick();
}

function landed() {
  const tile = BOARD[cur().pos];
  if (cur().pos === BOARD.length - 1) return win();

  if (tile.type === "bonus") {
    log(`踩到幸運格，前進 ${tile.n}！`);
    setTimeout(() => move(tile.n, () => afterEffect()), 350);
  } else if (tile.type === "trap") {
    log(`踩到陷阱，後退 ${tile.n}…`);
    cur().pos = Math.max(0, cur().pos - tile.n);
    renderAll();
    setTimeout(afterEffect, 350);
  } else if (tile.type === "q") {
    askQuestion();
  } else {
    nextTurn();
  }
}

function afterEffect() {
  if (cur().pos === BOARD.length - 1) return win();
  // 連鎖只觸發一次題目/陷阱，避免無限：落點再判一次但 bonus/trap 不再彈
  const tile = BOARD[cur().pos];
  if (tile.type === "q") askQuestion();
  else nextTurn();
}

function askQuestion() {
  const item = QUESTIONS[qIndex % QUESTIONS.length];
  qIndex++;
  $("mQuestion").textContent = item.q;
  $("mFeedback").className = "feedback hidden";
  $("mNext").classList.add("hidden");
  const box = $("mOptions");
  box.innerHTML = "";
  item.options.forEach((text, i) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.textContent = text;
    b.onclick = () => answer(i, b, item);
    box.appendChild(b);
  });
  $("modal").classList.remove("hidden");
}

function answer(i, btn, item) {
  [...document.querySelectorAll("#mOptions .opt")].forEach(o => o.disabled = true);
  document.querySelectorAll("#mOptions .opt")[item.answer].classList.add("correct");
  const fb = $("mFeedback");
  if (i === item.answer) {
    fb.className = "feedback";
    fb.innerHTML = `✅ 答對！前進 2 格。<br>${item.explain || ""}`;
    cur()._delta = 2;
  } else {
    btn.classList.add("wrong");
    fb.className = "feedback no";
    fb.innerHTML = `❌ 答錯，後退 2 格。<br>正解：${item.options[item.answer]}<br>${item.explain || ""}`;
    cur()._delta = -2;
  }
  $("mNext").classList.remove("hidden");
}

$("mNext") && ($("mNext").onclick = () => {
  $("modal").classList.add("hidden");
  const delta = cur()._delta || 0;
  cur()._delta = 0;
  if (delta > 0) move(delta, () => endQuestionMove());
  else { cur().pos = Math.max(0, cur().pos + delta); renderAll(); setTimeout(endQuestionMove, 300); }
});

function endQuestionMove() {
  if (cur().pos === BOARD.length - 1) return win();
  nextTurn();
}

function nextTurn() {
  turn = (turn + 1) % players.length;
  renderPlayers();
  log("換 " + cur().name);
  busy = false;
}

function win() {
  $("winText").textContent = `🏆 ${cur().token} ${cur().name} 抵達終點，獲勝！`;
  $("winModal").classList.remove("hidden");
  busy = true;
}

$("startBtn").onclick = startGame;
$("rollBtn").onclick = roll;
$("againBtn").onclick = () => {
  $("winModal").classList.add("hidden");
  $("gameView").classList.add("hidden");
  $("setupView").classList.remove("hidden");
};
