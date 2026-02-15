# Session Context

## User Prompts

### Prompt 1

ダークテーマに対応するOpenSpecを作成してください。

### Prompt 2

Start a new change using the experimental artifact-driven approach.

**Input**: The argument after `/opsx:new` is the change name (kebab-case), OR a description of what the user wants to build.

**Steps**

1. **If no input provided, ask what they want to build**

   Use the **AskUserQuestion tool** (open-ended, no preset options) to ask:
   > "What change do you want to work on? Describe what you want to build or fix."

   From their description, derive a kebab-case name (e.g., "add user authent...

### Prompt 3

Reviewの要約（Review Pack）は以下のような形式にしてください。

```
Build a client-side LLM cost simulator.

Non-goals:
- no real billing integration
- no server storage
- no auto pricing updates

Key Design Decisions:
- pure calc module
- user-provided prices

Assumptions & Risks:
- token counts are estimates
- cache model simplified

Decision:
Run /opsx:apply ?
```

### Prompt 4

Review Packを提示してください。コミットはしないでください。

### Prompt 5

まとめてでお願いします。

### Prompt 6

Fast-forward through artifact creation - generate everything needed to start implementation.

**Input**: The argument after `/opsx:ff` is the change name (kebab-case), OR a description of what the user wants to build.

**Steps**

1. **If no input provided, ask what they want to build**

   Use the **AskUserQuestion tool** (open-ended, no preset options) to ask:
   > "What change do you want to work on? Describe what you want to build or fix."

   From their description, derive a kebab-case name ...

### Prompt 7

これでお願いします。

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

LGTM
commitしてpushしてください。

### Prompt 11

`/opsx:verify` はなんですか・

### Prompt 12

commitする前にverify/arciveしたかったです。

### Prompt 13

お願いします。

### Prompt 14

Verify that an implementation matches the change artifacts (specs, tasks, design).

**Input**: Optionally specify a change name after `/opsx:verify` (e.g., `/opsx:verify add-auth`). If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

**Steps**

1. **If no change name provided, prompt for selection**

   Run `openspec list --json` to get available changes. Use the **AskUserQuestion tool** to let the user select.

   Show...

### Prompt 15

archiveしてください。

### Prompt 16

Archive a completed change in the experimental workflow.

**Input**: Optionally specify a change name after `/opsx:archive` (e.g., `/opsx:archive add-auth`). If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

**Steps**

1. **If no change name provided, prompt for selection**

   Run `openspec list --json` to get available changes. Use the **AskUserQuestion tool** to let the user select.

   Show only active changes (no...

### Prompt 17

archiveのcommitだけできるのが嫌なので、commit c7910086aca9b65a8a3f13538e0b40a9b2356fb9 と合わせて1つのcommitにしたいです。

### Prompt 18

force pushで良いです。

