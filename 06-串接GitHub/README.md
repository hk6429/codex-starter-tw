# 06 串接 GitHub

> 🟡 **進階／加分關。** 把電腦跟 GitHub「綁定」一次，之後 [07 推上 GitHub](../07-推上GitHub/) 才能一鍵把作品傳上去。現場時間不夠，這關當回家作業也完全可以。

## 為什麼要先「串接」？
GitHub 是放程式作品的雲端空間。你的電腦要先**證明「我就是這個 GitHub 帳號的主人」**，之後推作品才不會每次都要你輸入帳密。這個一次性的綁定，就叫串接。

整個流程做一次就好，之後永久有效。

---

## 最省事：直接叫 Codex 帶你做
其實你不一定要自己記指令。在任何專案資料夾啟動 `codex`，跟它說：
```
我要把作品推上 GitHub，但還沒設定過。請一步步帶我完成 GitHub 的登入與授權，
需要我做什麼就告訴我。
```
它會在需要時請你到瀏覽器授權，照著做即可——其實它走的就是下面這套流程。想自己理解的人，往下看。

---

## 想自己理解：四步驟串接

### 步驟 1：有一個 GitHub 帳號
還沒有就到 https://github.com 免費註冊（[00 前置準備](../00-前置準備/) 已提過）。記住帳號和密碼。

### 步驟 2：安裝 Git 與 GitHub 工具（gh）
開 PowerShell，貼上這兩行：
```powershell
winget install Git.Git
winget install GitHub.cli
```
（`Git` 是版本管理工具，`gh` 是 GitHub 官方指令工具。）裝完**關閉並重開** PowerShell。

### 步驟 3：登入並授權（這就是「串接」的核心）
```powershell
gh auth login
```
它會問你幾個問題，用方向鍵選、按 Enter：

1. 帳號類型 → 選 **GitHub.com**
2. 連線方式 → 選 **HTTPS**
3. 要不要用 Git 認證 → 選 **Yes**
4. 怎麼登入 → 選 **Login with a web browser**

接著畫面會給你一組 **一次性代碼**（像 `ABCD-1234`），並請你按 Enter 打開瀏覽器。
在瀏覽器**貼上那組代碼 → 按 Authorize 授權**，看到成功就回到 PowerShell。

> 📸 **【待補截圖】**：`gh auth login` 出現一次性代碼、請你到瀏覽器授權的畫面。

### 步驟 4：確認串接成功
```powershell
gh auth status
```
看到 `Logged in to github.com as 你的帳號` 就完成了 ✅

---

## App 版怎麼串接
走 [01b 用 App 版](../01b-用App版/) 的人更簡單：Codex App 內建 Git 與 GitHub 功能，第一次要推作品時，App 會直接跳出 GitHub 登入授權，照著點一次就綁定好了。

---

## 卡關排解
- **`winget` 說找不到指令？** Windows 11 內建 winget；若真的沒有，到 Microsoft Store 搜 `App Installer` 安裝即可。
- **`gh` 說找不到指令？** 沒重開 PowerShell。關閉再重開一次。
- **瀏覽器沒自動開？** 回 PowerShell 把它給的網址整段複製，自己貼到瀏覽器開啟，再貼代碼授權。
- **學校公務機裝不了？** 沒有安裝權限會卡在步驟 2，請改用自己的筆電（見 [00 前置準備](../00-前置準備/)）。

---

串接好了，就能去 [07 推上 GitHub](../07-推上GitHub/) 把第一個作品傳上雲端。
