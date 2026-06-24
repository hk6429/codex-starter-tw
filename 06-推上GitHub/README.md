# 06 推上 GitHub

> 🟡 **這是進階／加分關。** 現場時間不夠很正常——核心目標（裝好、登入、做出一個專案）達成就已經很棒了。這一關當**回家作業**慢慢做也完全可以。GitHub 登入授權對新手是另一個小門檻，不用急。

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

> 需要先安裝 Git：到 https://git-scm.com 下載 Windows 版安裝（一路下一步）。

### 1. 初始化並提交
在專案資料夾的 PowerShell：
```powershell
git init
git add .
git commit -m "我的第一個 Codex 作品"
```

### 2. 建立 GitHub repo 並推上去
最簡單用 GitHub 官方工具 `gh`（到 https://cli.github.com 安裝）：
```powershell
gh auth login
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

下一步：[07 AGENTS 範本](../07-AGENTS範本/)
