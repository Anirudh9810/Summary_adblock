# WebGuard AI Chrome Extension

A premium Chrome extension that blocks ads and provides AI-powered summaries of webpages.

## Features
- **🛡️ Ad Blocking**: Uses Manifest V3 `declarativeNetRequest` for efficient, browser-level ad blocking.
- **📑 Side Panel Interface**: Get summaries in a dedicated side panel that stays open while you browse.
- **💡 Custom Prompts**: Tell the AI exactly how you want the data summarized (e.g., "Bullet points", "ELI5", "Poem").
- **✨ Premium UI**: Modern glassmorphic design with smooth animations.

## How to Install
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top right).
3. Click **Load unpacked**.
4. Select the `web-guard-summarizer` folder.

## How to use AI Summarization
Currently, the extension uses a demonstration summarizer. To enable real AI power:
1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/).
2. Update the `popup.js` file to include your API key in the fetch request (a template is provided in the comments).

## Ad Blocking
The extension blocks domains specified in `rules.json`. You can expand this list by adding more domains to the blocklist.
