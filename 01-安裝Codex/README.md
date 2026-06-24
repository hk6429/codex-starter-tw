# 01 安裝 Codex

兩條路，挑一條。**推薦先試一鍵安裝**，失敗再走手動。

---

## A. 一鍵安裝（推薦）

開 **PowerShell（系統管理員）**，貼上：

```powershell
irm https://raw.githubusercontent.com/hk6429/codex-starter-tw/main/scripts/install-win.ps1 | iex
```

腳本會自動檢查並安裝 Node.js 與 Codex CLI。看到「完成！輸入 codex 就能啟動」就成功了。

> 若出現「無法載入指令碼，因為這個系統上已停用指令碼執行」，先跑下面這行再重試：
> ```powershell
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> ```

---

## B. 手動安裝（想一步步理解）

### 步驟 1：安裝 Node.js（22 版以上）
到 https://nodejs.org 下載 **LTS** 版，一路下一步安裝。
裝完**關閉並重開** PowerShell，輸入下面確認：
```powershell
node -v
```
看到 `v22.x.x`（或更高）就對了。

### 步驟 2：安裝 Codex CLI
```powershell
npm install -g @openai/codex
```

> ⚠️ 一定要打 `@openai/codex`。npm 上那個沒有 `@` 的 `codex` 是別人 2012 年的舊專案，裝錯就不能用。

### 步驟 3：確認安裝成功
```powershell
codex --version
```
有印出版本號就完成。

---

## 選用：換個更好用的終端機 Warp

PowerShell 已經夠用。想要介面更現代、字大好複製的話，可裝免費的 **Warp**：

```powershell
winget install Warp.Warp
```

（或到 https://www.warp.dev/download 下載）裝好開 Warp、用 email／Google 免費註冊帳號後，照樣輸入 `codex` 即可。詳見 [00 前置準備](../00-前置準備/)。

---

下一步：[02 登入](../02-登入/)
