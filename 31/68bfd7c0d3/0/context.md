# Session Context

## User Prompts

### Prompt 1

GitHub Agentic Workflowsを導入したいです。
https://github.com/github/gh-aw

### Prompt 2

PR作成時に自動でコードレビューをやりたいです。

### Prompt 3

1. ローカルに gh (GitHub CLI) はインストールされていますか？（現在未検出）
未インスールです。

2. 使いたいAIエンジンは何ですか？ — GitHub Copilot / Claude / OpenAI のどれか
Claude

3. このプロジェクトはすでにGitHubリポジトリとして公開されていますか？}
Yes

### Prompt 4

Start a new change using the experimental artifact-driven approach.

**Input**: The argument after `/opsx:new` is the change name (kebab-case), OR a description of what the user wants to build.

**Steps**

1. **If no input provided, ask what they want to build**

   Use the **AskUserQuestion tool** (open-ended, no preset options) to ask:
   > "What change do you want to work on? Describe what you want to build or fix."

   From their description, derive a kebab-case name (e.g., "add user authent...

### Prompt 5

お願いします。

### Prompt 6

お願いします。

### Prompt 7

Fast-forward through artifact creation - generate everything needed to start implementation.

**Input**: The argument after `/opsx:ff` is the change name (kebab-case), OR a description of what the user wants to build.

**Steps**

1. **If no input provided, ask what they want to build**

   Use the **AskUserQuestion tool** (open-ended, no preset options) to ask:
   > "What change do you want to work on? Describe what you want to build or fix."

   From their description, derive a kebab-case name ...

### Prompt 8

お願いします。

### Prompt 9

Implement tasks from an OpenSpec change.

**Input**: Optionally specify a change name (e.g., `/opsx:apply add-auth`). If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

**Steps**

1. **Select the change**

   If a name is provided, use it. Otherwise:
   - Infer from conversation context if the user mentioned a change
   - Auto-select if only one active change exists
   - If ambiguous, run `openspec list --json` to get ...

### Prompt 10

以下は実行しました。
1. gh auth login
2. gh extension install github/gh-aw
3. ANTHROPIC_API_KEY を GitHub Secrets に追加

### Prompt 11

動作確認（手動）もお願いします。

