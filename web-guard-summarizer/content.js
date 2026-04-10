/**
 * Content script to extract readable text from the document.
 */

function extractText() {
  // Simple heuristic for main content: get paragraphs and headings
  const selectors = ['p', 'h1', 'h2', 'h3', 'article', 'section'];
  let extractedText = "";

  // Try to find an article element first
  const article = document.querySelector('article');
  const root = article || document.body;

  const elements = root.querySelectorAll('p, h1, h2, h3');
  elements.forEach(el => {
    const text = el.innerText.trim();
    if (text.length > 20) { // Filter out short snippets
      extractedText += text + "\n\n";
    }
  });

  return extractedText.substring(0, 5000); // Limit context length
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractContent") {
    const content = extractText();
    sendResponse({ content: content });
  }
});
