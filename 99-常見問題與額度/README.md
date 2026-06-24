# 99 常見問題與額度

## 安裝類

**Q：貼上一鍵安裝指令，出現「無法載入指令碼，已停用指令碼執行」？**
先跑這行再重試（只對這個視窗有效，安全）：
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

**Q：`node -v` 說找不到 node？**
Node.js 沒裝好，或裝完沒重開 PowerShell。請**關閉並重新打開** PowerShell 再試；還是不行就到 https://nodejs.org 重裝 LTS 版。

**Q：`codex` 說找不到指令？**
- 確認剛剛是裝 `@openai/codex`（不是 `codex`）。
- 關閉並重開 PowerShell。
- 還是不行：`npm install -g @openai/codex` 再跑一次，看有沒有紅字錯誤。

**Q：裝錯成別的 `codex`？**
先移除：`npm uninstall -g codex`，再裝正確的：`npm install -g @openai/codex`。

## 登入類

**Q：登入時說我沒有權限／無法使用？**
確認你用的是 **付費 ChatGPT 帳號（Plus 即可，不必到 Pro）**。免費帳號用量極少、跑這堂課不夠，請先升級到 Plus。

**Q：瀏覽器沒自動跳出？**
回 PowerShell 看有沒有一段網址，手動複製貼到瀏覽器開啟即可。

## 使用類

**Q：Codex 改壞了我的檔案？**
跟它說「還原剛剛的修改」。重要資料夾建議先用 Git（見步驟 07）保存版本。

**Q：它一直問我要不要同意，好煩？**
那是安全設計。熟了之後可在選單把核准模式調成「自動改檔」加快（見步驟 04），但別在重要資料夾用全自動。

## 額度

- Codex CLI 用量含在**付費 ChatGPT 訂閱**內（Plus 即可），照正常使用三小時課程綽綽有餘。
- 若短時間內超量使用會暫時限速，**休息一下即可恢復**，不會額外扣款。
- 想省用量：把需求一次講清楚，少來回；善用 `AGENTS.md` 與 Skill 減少重複交代。

## 進階：可以改用 API key 嗎？

**這堂課不需要，也不建議。** 用 ChatGPT 訂閱登入（Plus 即可）本來就含額度、不另外收費；換成 API key 是改成「**按使用量付費**」，每次用都實際從另一個 OpenAI 帳戶扣錢。只有自動化、跟人分開計費等進階情境才需要。

真的要換（先確定你願意付費）：

1. 到 https://platform.openai.com/api-keys 建立一把金鑰（`sk-...`，這是另一個錢包，要另外綁卡）。
2. **一定先登出**，否則切不過去（官方已知 bug）：
   ```powershell
   codex logout
   codex
   ```
   重新啟動後選第 **3 項「Provide your own API key」**，貼上金鑰。
3. 想換回訂閱：再 `codex logout` 一次 → 重開 `codex` → 選「Sign in with ChatGPT」。

> ⚠️ 切到 API key 後就會**真的開始算錢**。好奇試切的人記得用完換回訂閱，免得被扣款。

---

## 安全守則（再強調一次）
1. 不把密碼、金鑰貼進對話。
2. 看不懂它要跑的指令，先別同意。
3. 不在放重要資料的資料夾開全自動。
4. 不確定就舉手問老師。
