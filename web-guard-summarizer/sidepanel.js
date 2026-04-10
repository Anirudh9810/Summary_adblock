// Rescue Version 2 - Model Config Mode
console.log("WebGuard Sidepanel Script Initializing...");

const testBtn = document.getElementById('test-btn');
if (testBtn) {
  testBtn.onclick = () => alert("System Check: JavaScript is ALIVE and responding!");
}

async function initializeApp() {
  const summarizeBtn = document.getElementById('summarize-btn');
  const customPromptInput = document.getElementById('custom-prompt');
  const btnText = summarizeBtn.querySelector('.btn-text');
  const loader = summarizeBtn.querySelector('.loader');
  const summaryResult = document.getElementById('summary-result');
  const summaryText = document.getElementById('summary-text');

  const settingsToggle = document.getElementById('settings-toggle');
  const settingsPanel = document.getElementById('settings-panel');
  const apiKeyInput = document.getElementById('api-key');
  const modelNameInput = document.getElementById('model-name');
  const saveSettingsBtn = document.getElementById('save-settings');

  // Load saved settings
  const data = await chrome.storage.local.get(['geminiApiKey', 'summarizationModel']);
  if (data.geminiApiKey) apiKeyInput.value = data.geminiApiKey;
  if (data.summarizationModel) modelNameInput.value = data.summarizationModel;
  else modelNameInput.value = "gemini-1.5-flash"; // Default

  settingsToggle.onclick = () => settingsPanel.classList.toggle('hidden');

  saveSettingsBtn.onclick = async () => {
    const key = apiKeyInput.value.trim();
    const model = modelNameInput.value.trim();
    await chrome.storage.local.set({
      geminiApiKey: key,
      summarizationModel: model
    });
    alert('Settings Saved! Model set to: ' + model);
    settingsPanel.classList.add('hidden');
  };

  summarizeBtn.onclick = async () => {
    summaryResult.classList.add('hidden');
    btnText.textContent = 'Reading Content...';
    loader.classList.remove('hidden');
    summarizeBtn.disabled = true;

    try {
      const apiKey = apiKeyInput.value.trim();
      const model = modelNameInput.value.trim() || "gemini-1.5-flash";

      if (!apiKey) {
        alert('Missing API Key. Open settings (gear icon) and paste your key.');
        stopLoading();
        return;
      }

      console.log("Querying tabs...");
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) throw new Error("Could not find the active tab.");

      btnText.textContent = 'Calling Gemini (' + model + ')...';
      console.log("Executing script on tab: " + tab.id);

      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.body.innerText.substring(0, 8000)
      });

      const pageContent = results[0]?.result;
      if (!pageContent) throw new Error("Could not extract text from this page.");

      const summary = await callGemini(apiKey, model, pageContent, customPromptInput.value);
      summaryText.innerText = summary;
      summaryResult.classList.remove('hidden');
    } catch (err) {
      alert("Error: " + err.message);
      summaryText.innerText = "Error: " + err.message;
      summaryResult.classList.remove('hidden');
    } finally {
      stopLoading();
    }
  };

  function stopLoading() {
    btnText.textContent = 'Summarize Page';
    loader.classList.add('hidden');
    summarizeBtn.disabled = false;
  }
}

async function callGemini(key, model, content, userPrompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Summarize this text: ${content}\n\nAdditional Instructions: ${userPrompt}` }] }]
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "API error: " + response.status);
  }

  const result = await response.json();
  const summary = result.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!summary) throw new Error("API returned an empty summary. Check your model name.");
  return summary;
}

initializeApp().catch(e => alert("Initialization Error: " + e.message));
