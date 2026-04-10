# WebGuard AI & Project Class Code

A premium Chrome extension designed to declutter your web experience by blocking ads and providing high-quality, AI-powered webpage summaries directly in a dedicated side panel.

## 🚀 Main Feature: WebGuard AI Extension
WebGuard AI combines advanced ad-blocking logic with the power of Google's Gemini models to streamline your browsing.

### Key Features:
- **🛡️ Ad Blocking**: Uses Manifest V3 `declarativeNetRequest` for high-performance, browser-level blocking of intrusive ads and trackers.
- **📑 Side Panel Summaries**: Get instant summaries of complex articles without leaving your current tab.
- **🤖 Gemini Integration**: Fully supports Gemini 1.5/2.0+ models with custom instructions (e.g., "Summarize as bullet points", "Explain like I'm 5").
- **🎨 Premium UI**: A sleek, glassmorphic design that feels native to modern browsers.

---

## 📂 Project Structure

```text
.
├── .gitignore              # Git ignore rules for Python and IDEs
├── README.md               # Project overview (this file)
├── uv.lock                 # Unified Python dependency lockfile
├── pyproject.toml          # Project configuration and dependencies
└── web-guard-summarizer/   # Chrome Extension Source Code
    ├── manifest.json       # Extension configuration (Manifest V3)
    ├── background.js       # Service worker for ad-blocking & lifecycle
    ├── content.js          # Script for page content extraction
    ├── sidepanel.html      # Summarization UI in the side panel
    ├── sidepanel.js        # Main logic for AI integration & settings
    ├── sidepanel.css       # Premium glassmorphic styling
    ├── rules.json          # Ad-blocking ruleset
    ├── icons/              # Extension icons (16px, 48px, 128px)
    └── README.md           # Extension-specific documentation
```

---

## 🛠️ Installation & Setup

### For the Chrome Extension:
1.  Open Chrome and navigate to `chrome://extensions/`.
2.  Enable **Developer mode** in the top right.
3.  Click **Load unpacked**.
4.  Select the `web-guard-summarizer` folder from this repository.
5.  Open the extension settings (⚙️ icon) in the side panel to add your Gemini API Key.

### For the Python Environment:
This project uses `uv` for lightning-fast dependency management.
1.  Install `uv` (if not already present).
2.  Run `uv sync` to install all dependencies into a local `.venv`.

---

## 🔒 Privacy & Security
- **API Keys**: All Gemini API keys are stored in your browser's local storage (`chrome.storage.local`) and are never sent to any server other than the official Google Gemini API endpoints.
- **Ad Blocking**: Blocking happens locally using optimized browser-level rules.
