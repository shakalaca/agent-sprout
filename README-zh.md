# Agent Sprout

[English README](README.md)

<img src="assets/agent-sprout-icon.png" alt="Agent Sprout icon" width="160">

Agent Sprout 是一套 repo-local 執行系統種子：先以輕量、可攜的核心進入目標 repo，再長出 AGENTS contract、可重用 skills、完整 playbook 基線，以及按需加入的 audit 能力。

狀態說明：此 repo 目前是整理完成的模板與參考資產庫，不是 CLI scaffolder，也不是一鍵安裝器。

補充：根目錄的 `SKILL.md` 是給 AI 做 skill discovery 用的機器入口檔，實際角色比較接近 deploy/scaffold driver，而不是提供人類閱讀的安裝說明，因此檔名仍保留 `SKILL.md`。

## 專案概觀

1. 作為 repo-local execution contract 的根目錄 `AGENTS.md` 模板
2. 可攜、可重用的 `skills/` 模板
3. 作為 escalation layer 的完整 playbook modules 集合
4. 用於驗證與觀察的選配 audit tooling 模板

這個 repo 的核心定位，不是替任意專案自動安裝流程，而是提供一套一致、可移植、可逐步落地的內容資產。它比較像模板系統的 source repository，而不是安裝程式。

### 特性摘要

- 預設以根目錄 `AGENTS.md` contract 模板作為 repo-local flow 基線
- `skills/` 與 `{{PLAYBOOK_ROOT}}` 解耦
- playbook 即使隨預設 bundle 一起導入，仍維持 escalation-only 角色
- audit 作為 evidence layer，需要時才引入
- `references/` 提供架構、遷移、模組與模板契約說明

### 目前邊界

- 有可直接移植的 AGENTS、skills、playbook、audit 模板
- 有完整的架構、導入與遷移說明文件
- 沒有獨立 CLI
- 沒有 package metadata 或可發佈安裝物
- 沒有現成的一鍵 scaffolding 入口

### 建議使用方式

1. 先決定目標 repo 的 `{{SKILLS_ROOT}}` 與 `{{PLAYBOOK_ROOT}}`
2. 從 `assets/templates/` 導入預設 bundle：根目錄 `AGENTS`、完整 `skills/` 集合，以及完整 playbook 模組集
3. 只有在目標 repo 需要 evidence 或 regression 檢查時，再加入 audit 模板
4. 依 `references/skills-template-contract.md` 對齊 skill header 與格式
5. 若是從舊結構遷移，依 `references/repo-local-migration.md` 進行調整

## 內含資產

### AGENTS 模板

- `assets/templates/AGENTS.template.md`：主要的 repo-local contract 模板；其中對 playbook 的引用維持 escalation 角色，而不是預設主路徑。

### Playbook 模板

目前已內含完整的 `00` 到 `09` 模組集：

- `00-core-operating-principles`
- `01-execution-flow`
- `02-task-planning-template`
- `03-versioning-policy`
- `04-changelog-standard`
- `05-release-runbook`
- `06-systematic-debugging`
- `07-progress-persistence-reanchor`
- `08-workflow-orchestration`
- `09-lessons-driven-improvement`

### Skills 模板

通用技能：

- `analyze-code`
- `write-tests`
- `refactor-guardrails`
- `commit`
- `security-quick-scan`

工作流技能：

- `decide-version-bump`
- `draft-changelog-entry`
- `release-readiness-check`
- `debug-root-cause`
- `reanchor`
- `plan-closeout`
- `capture-lessons`
- `candidate-for-core`

### Audit 模板

- `audit_skill_usage`：檢查 session 中是否真的有讀取 skill 檔案
- `audit_agents_health`：檢查 AGENTS 結構、路由覆蓋與引用完整性
- 另附 baseline 範例、輔助函式、suite 模板與測試接線模板，方便移植到目標 repo

## 參考文件

- `references/architecture-blueprint.md`：架構理由與目標形狀
- `references/playbook-modules.md`：playbook 模組與預設 bundle 導入說明
- `references/skills-template-contract.md`：skill 模板契約與 header 慣例
- `references/repo-local-migration.md`：舊結構的 retrofit 路徑
- `references/audit-tooling.md`：audit 模板結構與接線方式

## 維護說明

- 將 `assets/templates/AGENTS.template.md` 視為唯一的基準 AGENTS 模板。
- 調整 skill 模板時，同步維護 `README.template.md` 與 skills contract。
- 模組清單或預設 bundle 導入方式變更時，同步更新 `references/playbook-modules.md`。
- audit 模板變更時，同步更新 `references/audit-tooling.md` 與 baseline 範例。
- 整體架構方向變更時，同步更新 `SKILL.md` 與 `references/architecture-blueprint.md`。