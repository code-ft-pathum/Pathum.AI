# Pathum.AI — AI Text Humanizer

> Transform AI-generated content into natural, human-sounding text using dual-stage NVIDIA Nemotron reasoning.

## Features

- 🤖 **Dual-stage AI reasoning** via OpenRouter (NVIDIA Nemotron)
- 🎯 **7 Context Modes** — Normal, Academic, Speech, Creative, Professional, Casual, Technical
- ⚡ **10 Humanization Levels** — from minimal tweaks to full rewrite
- 🌙 **Dark & Light theme** with localStorage persistence
- 📋 Copy to clipboard & `.txt` download
- 📊 Word count diff stats on output
- ✨ Premium glassmorphism UI with animated background orbs

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Custom CSS
- **AI**: OpenRouter API — `nvidia/nemotron-super-49b-v1:free`

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/code-ft-pathum/Pathum.AI.git
cd Pathum.AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Get your free API key at [openrouter.ai](https://openrouter.ai).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

Pathum.AI uses a **two-pass reasoning pipeline**:

1. **First call** — sends your text with `reasoning: { enabled: true }` to let the model think deeply about how to humanize it
2. **Second call** — passes the assistant's reasoning back, asking the model to refine and finalize the output

This produces significantly more natural-sounding results than a single-pass approach.

## Environment Variables

| Variable | Description |
|---|---|
| `OPENROUTER_API_KEY` | Your OpenRouter API key |

## License

MIT
