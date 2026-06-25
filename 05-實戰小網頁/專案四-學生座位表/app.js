// 學生座位表 —— 純前端，資料存 localStorage，雙擊即用
const $ = (id) => document.getElementById(id);
const grid = $("grid");
const KEY = "seating-chart-v1";

let seats = []; // 每格一個名字，"" 代表空位

function colsRows() {
  return [Math.max(1, +$("cols").value || 1), Math.max(1, +$("rows").value || 1)];
}

function save() {
  localStorage.setItem(KEY, JSON.stringify({
    className: $("className").value,
    cols: $("cols").value,
    rows: $("rows").value,
    names: $("names").value,
    seats,
  }));
}

function load() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return;
  try {
    const d = JSON.parse(raw);
    $("className").value = d.className || "";
    $("cols").value = d.cols || 6;
    $("rows").value = d.rows || 5;
    $("names").value = d.names || "";
    seats = d.seats || [];
    render();
  } catch (e) { /* 壞掉就忽略，重新開始 */ }
}

function parseNames() {
  return $("names").value.split("\n").map(s => s.trim()).filter(Boolean);
}

function seatByList() {
  const [cols, rows] = colsRows();
  const list = parseNames();
  seats = Array(cols * rows).fill("");
  list.slice(0, cols * rows).forEach((name, i) => seats[i] = name);
  render(); save();
}

function shuffle() {
  // 只洗有名字的，空位保持空
  const filled = seats.filter(Boolean);
  for (let i = filled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filled[i], filled[j]] = [filled[j], filled[i]];
  }
  let k = 0;
  seats = seats.map(s => s ? filled[k++] : "");
  render(); save();
}

function render() {
  const [cols, rows] = colsRows();
  if (seats.length !== cols * rows) {
    const old = seats;
    seats = Array(cols * rows).fill("");
    old.forEach((s, i) => { if (i < seats.length) seats[i] = s; });
  }
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  grid.innerHTML = "";
  seats.forEach((name, i) => {
    const div = document.createElement("div");
    div.className = "seat " + (name ? "filled" : "empty");
    div.textContent = name || "（空）";
    div.draggable = !!name;
    div.dataset.idx = i;
    bindDrag(div);
    grid.appendChild(div);
  });
}

function bindDrag(el) {
  el.addEventListener("dragstart", e => e.dataTransfer.setData("text/plain", el.dataset.idx));
  el.addEventListener("dragover", e => { e.preventDefault(); el.classList.add("dragover"); });
  el.addEventListener("dragleave", () => el.classList.remove("dragover"));
  el.addEventListener("drop", e => {
    e.preventDefault();
    el.classList.remove("dragover");
    const from = +e.dataTransfer.getData("text/plain");
    const to = +el.dataset.idx;
    [seats[from], seats[to]] = [seats[to], seats[from]];
    render(); save();
  });
}

$("seatBtn").onclick = seatByList;
$("shuffleBtn").onclick = shuffle;
$("printBtn").onclick = () => window.print();
$("clearBtn").onclick = () => {
  if (!confirm("確定清空名單與座位？")) return;
  $("names").value = ""; seats = []; render(); save();
};
["cols", "rows"].forEach(id => $(id).addEventListener("change", () => { render(); save(); }));
["className", "names"].forEach(id => $(id).addEventListener("input", save));

load();
render();
