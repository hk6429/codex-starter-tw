# 07b 用 GitHub 備份你的 Obsidian 筆記

> 🟡 **進階／應用關。** 把你在 [06 串接 GitHub](../06-串接GitHub/)、[07 推上 GitHub](../07-推上GitHub/) 學到的技能，拿來做一件天天用得到的事：**幫 Obsidian 筆記庫做雲端版本備份。**

## 為什麼值得做
- Obsidian 的筆記就是一堆 `.md` 純文字檔，放在你電腦本機——**電腦壞掉、誤刪、改錯，就回不來了。**
- 用 Git + GitHub 備份：**免費、可隨時回溯到任何一天的舊版本**，比單純的雲端同步更安全。
- 雲端同步（iCloud／OneDrive）和 Git 備份**互補**：同步是「多台裝置一致」，Git 是「留下歷史、可還原」。同步把檔案改壞了會一起壞，Git 卻能翻回前一版。

> ⚠️ **筆記是私密的，備份 repo 一定要設「私人（private）」**，不要公開。下面都會用 `--private`。

---

## 前提
先完成 [06 串接 GitHub](../06-串接GitHub/)（裝好 Git、`gh`，登入過）。

先找到你的**筆記庫資料夾**位置：Obsidian 裡 `設定 → 關於`，或你當初建立庫時選的資料夾（常見在「文件」底下）。

---

## 最省事：叫 Codex 代勞
在你的筆記庫資料夾啟動 `codex`，貼上（把路徑換成你的）：
```
這個資料夾是我的 Obsidian 筆記庫。請幫我做成一個「私人」GitHub repo 備份：
做好 git 初始化、加上適合 Obsidian 的 .gitignore、commit，並用 --private 推上去。
之後我只要說「備份筆記」，你就幫我再 commit + push 一次。
```
之後想備份，開 `codex` 說一句「備份筆記」就好。

---

## 想自己理解：手動備份

### 第一次：建立私人備份庫
在筆記庫資料夾的 PowerShell：
```powershell
git init
git add .
git commit -m "第一次備份"
gh repo create my-notes --private --source=. --push
```
跑完你就有一個**只有你看得到**的 `my-notes` 私人 repo，筆記全在裡面了。

### 之後每次備份：三行
```powershell
git add .
git commit -m "備份 2026-06-24"
git push
```
（`-m` 後面那句隨意寫，通常放日期，方便日後辨認。）

---

## 進階：做一個「一鍵備份」Skill
覺得每次打三行很煩？到 [09 做你的 Skill](../09-做你的Skill/) 做一個叫「備份筆記」的 Skill，
裡面就是「`git add` → `git commit`（訊息用今天日期）→ `git push`」。以後說「備份筆記」一鍵完成。

---

## 注意事項
- ✅ **務必 `--private`**：筆記含個資、學生資料、私人想法，絕不要公開。
- 🖼️ 筆記裡若有大量圖片／PDF 附件，repo 會比較大；純文字筆記則很輕量，完全沒問題。
- 📁 `.obsidian/` 裡的佈景、外掛設定要不要一起備份都可以；不想備份本機視窗狀態，可在 `.gitignore` 加一行 `.obsidian/workspace*.json`（交給 Codex 處理最快）。
- 🔁 想每天自動備份是更進階的題目（排程／定時），先學會手動，習慣了再研究。

---

走 [App 版](../01b-用App版/) 的人一樣適用：選筆記庫資料夾、用 App 內建 Git 或直接叫 Codex「備份筆記」即可。
