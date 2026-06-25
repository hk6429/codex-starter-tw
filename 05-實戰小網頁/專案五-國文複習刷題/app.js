// 國文複習刷題 —— 題庫在 questions.js，這裡只管流程
const $ = (id) => document.getElementById(id);
const BEST_KEY = "guowen-quiz-best";

let pool = [];      // 本回合題目
let idx = 0;        // 第幾題
let correct = 0;    // 答對數
let wrong = [];     // 答錯的題目（給「只重練答錯」用）
let answered = false;

function shuffleArr(a) {
  const arr = a.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function show(view) {
  ["startView", "quizView", "resultView"].forEach(v => $(v).classList.add("hidden"));
  $(view).classList.remove("hidden");
}

function start(list) {
  pool = $("shuffleChk").checked ? shuffleArr(list) : list.slice();
  idx = 0; correct = 0; wrong = []; answered = false;
  show("quizView");
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const item = pool[idx];
  $("progress").style.width = `${(idx / pool.length) * 100}%`;
  $("counter").textContent = `第 ${idx + 1} / ${pool.length} 題`;
  $("score").textContent = `答對 ${correct}`;
  $("tag").textContent = item.tag || "國文";
  $("question").textContent = item.q;
  $("feedback").className = "feedback hidden";
  $("nextBtn").classList.add("hidden");

  const box = $("options");
  box.innerHTML = "";
  item.options.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.textContent = text;
    btn.onclick = () => choose(i, btn);
    box.appendChild(btn);
  });
}

function choose(i, btn) {
  if (answered) return;
  answered = true;
  const item = pool[idx];
  const opts = [...document.querySelectorAll(".opt")];
  opts.forEach(o => o.disabled = true);
  opts[item.answer].classList.add("correct");

  const fb = $("feedback");
  if (i === item.answer) {
    correct++;
    fb.className = "feedback ok";
    fb.innerHTML = `<b>✅ 答對了！</b>${item.explain || ""}`;
  } else {
    btn.classList.add("wrong");
    wrong.push(item);
    fb.className = "feedback no";
    fb.innerHTML = `<b>❌ 答錯了</b>正解：${item.options[item.answer]}。<br>${item.explain || ""}`;
  }
  $("score").textContent = `答對 ${correct}`;
  $("nextBtn").classList.remove("hidden");
}

function next() {
  idx++;
  if (idx < pool.length) renderQuestion();
  else finish();
}

function finish() {
  show("resultView");
  const total = pool.length;
  const pct = Math.round((correct / total) * 100);
  $("resultScore").textContent = `${correct} / ${total}　（${pct} 分）`;
  let title = "完成！", msg = "";
  if (pct === 100) { title = "🏆 滿分！"; msg = "全對，國文底子真的很穩。"; }
  else if (pct >= 80) { title = "👍 很不錯！"; msg = "再把錯的補起來就完美了。"; }
  else if (pct >= 60) { title = "加油！"; msg = "用下面「只重練答錯的」加強弱點。"; }
  else { title = "別氣餒"; msg = "多刷幾次就會進步，先把答錯的再練一遍。"; }
  $("resultTitle").textContent = title;
  $("resultMsg").textContent = msg;

  const best = +localStorage.getItem(BEST_KEY) || 0;
  if (pct > best) localStorage.setItem(BEST_KEY, pct);
  $("retryWrongBtn").style.display = wrong.length ? "" : "none";
}

function refreshStart() {
  $("bankInfo").textContent = `題庫共 ${QUESTIONS.length} 題`;
  const best = +localStorage.getItem(BEST_KEY) || 0;
  $("bestInfo").textContent = best ? `你的最佳成績：${best} 分` : "";
}

$("startBtn").onclick = () => start(QUESTIONS);
$("nextBtn").onclick = next;
$("restartBtn").onclick = () => { refreshStart(); show("startView"); };
$("retryWrongBtn").onclick = () => start(wrong);

refreshStart();
show("startView");
