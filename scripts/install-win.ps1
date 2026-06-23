# Codex CLI 一鍵安裝（Windows / PowerShell）
# 用法：開「PowerShell（系統管理員）」貼上：
#   irm https://raw.githubusercontent.com/hk6429/codex-starter-tw/main/scripts/install-win.ps1 | iex

Write-Host "=== Codex CLI 安裝小幫手 ===" -ForegroundColor Cyan

# 1) 檢查 Node.js
$node = Get-Command node -ErrorAction SilentlyContinue
if ($node) {
    $ver = (node -v)
    Write-Host "已偵測到 Node.js $ver" -ForegroundColor Green
} else {
    Write-Host "找不到 Node.js，嘗試用 winget 安裝 Node.js LTS..." -ForegroundColor Yellow
    $winget = Get-Command winget -ErrorAction SilentlyContinue
    if ($winget) {
        winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
        Write-Host "Node.js 安裝完成。請『關閉並重開 PowerShell』後再執行一次本指令。" -ForegroundColor Yellow
        return
    } else {
        Write-Host "這台電腦沒有 winget。請手動到 https://nodejs.org 下載 LTS 版安裝後，重開 PowerShell 再試一次。" -ForegroundColor Red
        return
    }
}

# 2) 確認 Node 版本 >= 22
$major = [int]((node -v) -replace 'v','' -split '\.')[0]
if ($major -lt 22) {
    Write-Host "你的 Node.js 版本太舊（需要 22 以上）。請到 https://nodejs.org 更新後再試。" -ForegroundColor Red
    return
}

# 3) 安裝 Codex CLI（注意是 @openai/codex，不是 codex）
Write-Host "安裝 Codex CLI（@openai/codex）..." -ForegroundColor Cyan
npm install -g @openai/codex

# 4) 驗證
$codex = Get-Command codex -ErrorAction SilentlyContinue
if ($codex) {
    Write-Host "完成！輸入 codex 就能啟動。" -ForegroundColor Green
    Write-Host "下一步：到課程的『02 登入』用你的 ChatGPT Pro 帳號登入。" -ForegroundColor Green
} else {
    Write-Host "安裝似乎完成，但找不到 codex 指令。請關閉並重開 PowerShell 再輸入 codex 試試。" -ForegroundColor Yellow
}
