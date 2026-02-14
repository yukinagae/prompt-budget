# Prompt Budget

A Vercel-deployable web dashboard for estimating LLM API costs from token and call parameters.

## What it does

Enter your pricing and usage parameters and instantly see:
- **Total monthly cost**
- **Cost per API call**
- **Line-item breakdown** — input tokens, cache-read tokens, output tokens

## Getting started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
# Open http://localhost:3000

# Run lint
pnpm lint

# Run tests
pnpm test

# Production build
pnpm build
```

## Inputs explained

| Field | Description |
|---|---|
| Input price ($/1M tokens) | Cost per million input (prompt) tokens |
| Output price ($/1M tokens) | Cost per million output (completion) tokens |
| Cache-read price ($/1M tokens) | Cost per million tokens served from the provider's prompt cache |
| Input tokens / call | Number of input tokens in a typical API call |
| Output tokens / call | Number of output tokens in a typical API call |
| Calls / day | Number of API calls made per day |
| Days / month | Number of days in your billing period |
| Cache hit rate (%) | Percentage of input tokens served from cache |

## Presets

Three presets provide a starting point with approximate public pricing:

- **GPT-4o** — OpenAI
- **Claude Sonnet 3.5** — Anthropic
- **Gemini 1.5 Pro** — Google

> **Disclaimer**: Preset prices are approximate and may be outdated. Always verify current pricing on the provider's pricing page before making financial decisions.

## Assumptions

- All prices are in **USD per 1,000,000 tokens** (the unit used by major providers).
- The **cache hit rate** applies to input tokens only. Cached tokens are billed at the cache-read price; the remainder at the full input price.
- Output tokens are never cached.
- Monthly cost = (cost per call) × calls/day × days/month.
- Settings are persisted in **localStorage** — no data is sent to any server.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Connect the repo in the [Vercel dashboard](https://vercel.com).
3. Vercel auto-detects Next.js — no additional configuration required.
4. Deploy.

No environment variables are required.
