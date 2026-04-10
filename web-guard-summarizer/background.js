// Background service worker for WebGuard AI

chrome.runtime.onInstalled.addListener(() => {
  console.log('WebGuard & AI Summarizer installed.');
  
  // Set default settings
  chrome.storage.local.set({ 
    summarizationModel: 'gemini-1.5-flash',
    adBlockEnabled: true 
  });

  // Create context menu for quick summary
  chrome.contextMenus.create({
    id: "openSidePanel",
    title: "Summarize this page",
    contexts: ["all"]
  });
});

// Open side panel when context menu is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openSidePanel") {
    chrome.sidePanel.open({ tabId: tab.id });
  }
});

// Ensure side panel opens on action click
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
