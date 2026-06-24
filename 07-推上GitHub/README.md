# 07 推上 GitHub

> 🟡 **這是進階／加分關。** 現場時間不夠很正常——核心目標（裝好、登入、做出一個專案）達成就已經很棒了。這一關當**回家作業**慢慢做也完全可以。
>
> 👉 前提：先完成 [06 串接 GitHub](../06-串接GitHub/)（電腦跟 GitHub 綁定）。沒做也沒關係——下面「請 Codex 代勞」那條會在需要時直接帶你串接。

把你做的網頁變成可以分享的網路作品。最簡單的方法：**讓 Codex 幫你做。**

---

## 最簡單：請 Codex 代勞
在你的專案資料夾裡（例如「小考測驗」）啟動 `codex`，貼上：
```
幫我把這個資料夾推上 GitHub，建立一個新的公開 repo 叫 my-quiz，
幫我做好 git 初始化、commit，並推上去。如果需要我登入或授權，請告訴我怎麼做。
```
Codex 會一步步帶你做，過程中可能請你在瀏覽器登入 GitHub 授權，照做即可。

---

## 想自己理解：手動四步驟

> 前提：已完成 [06 串接 GitHub](../06-串接GitHub/)（裝好 Git、`gh`，並 `gh auth login` 登入過）。

### 1. 初始化並提交
在專案資料夾的 PowerShell：
```powershell
git init
git add .
git commit -m "我的第一個 Codex 作品"
```

### 2. 建立 GitHub repo 並推上去
用 GitHub 官方工具 `gh`（已在 [06](../06-串接GitHub/) 裝好並登入）：
```powershell
gh repo create my-quiz --public --source=. --push
```

### 3. 確認
跑完它會給你一個網址（像 `https://github.com/你的帳號/my-quiz`），打開就看到你的作品了。

---

## 進階：讓網頁可以直接被瀏覽（GitHub Pages）
跟 Codex 說：
```
幫我把這個 repo 開啟 GitHub Pages，讓別人可以用網址直接打開我的 quiz.html。
```
完成後你會得到一個公開網址，傳給學生就能用。

> 💡 用 Obsidian 寫筆記的人：這套 GitHub 技能可以直接拿來**備份你的筆記庫**，見 [07b Obsidian 備份](../07b-Obsidian備份/)。

下一步：[08 AGENTS 範本](../08-AGENTS範本/)
