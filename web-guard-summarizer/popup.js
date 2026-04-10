document.addEventListener('DOMContentLoaded', () => {
  const summarizeBtn = document.getElementById('summarize-btn');
  const btnText = summarizeBtn.querySelector('.btn-text');
  const loader = summarizeBtn.querySelector('.loader');
  const summaryResult = document.getElementById('summary-result');
  const summaryText = document.getElementById('summary-text');
  const copyBtn = document.getElementById('copy-summary');

  summarizeBtn.addEventListener('click', async () => {
    // 1. UI Feedback
    btnText.textContent = 'Analyzing...';
    loader.classList.remove('hidden');
    summarizeBtn.disabled = true;
    summaryResult.classList.add('hidden');

    try {
      // 2. Get content from current tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Inject content script if it's not already there (Manifest V3 handles this, but good to be safe)
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const selectors = ['p', 'h1', 'h2', 'h3', 'article'];
          let text = "";
          document.querySelectorAll('p, h1, h2, h3').forEach(el => text += el.innerText + "\n");
          return text.substring(0, 4000);
        }
      });

      const pageContent = results[0].result;

      if (!pageContent || pageContent.trim().length < 50) {
        throw new Error("Could not find enough content to summarize.");
      }

      // 3. Call AI Summarizer (Mocking for now, or using a simple heuristic)
      // In a real app, you'd call: 
      // const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY', ...)
      
      const summary = await simulateSummarization(pageContent);

      // 4. Display Result
      summaryText.innerText = summary;
      summaryResult.classList.remove('hidden');
    } catch (error) {
      console.error(error);
      summaryText.innerHTML = `<span style="color: #ef4444;">Error: ${error.message}</span>`;
      summaryResult.classList.remove('hidden');
    } finally {
      btnText.textContent = 'Summarize Now';
      loader.classList.add('hidden');
      summarizeBtn.disabled = false;
    }
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(summaryText.innerText);
    const originalText = copyBtn.innerText;
    copyBtn.innerText = '✅';
    setTimeout(() => copyBtn.innerText = originalText, 2000);
  });
});

/**
 * Simulates a call to an AI model for summarization.
 * Replace this with a real API call to Gemini.
 */
async function simulateSummarization(content) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple logic to mock a summary based on the text
      const sentences = content.split('.').filter(s => s.trim().length > 10);
      const points = sentences.slice(0, 3).map(s => `• ${s.trim()}.`);
      
      resolve("Based on the page content, here are the key points:\n\n" + points.join('\n\n') + "\n\n(Note: This is a demo summary. To enable full AI power, connect a Gemini API key in the background settings.)");
    }, 1500);
  });
}
