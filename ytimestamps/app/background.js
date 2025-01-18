// Borra los timestamps almacenados al actualizar una pestaña
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.local.remove('timestamps', () => {
      console.log('Timestamps updated.');
    });
  }
});

// Borra los timestamps almacenados al cerrar una pestaña
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  chrome.storage.local.remove('timestamps', () => {
    console.log('Timestamps eliminated when closing tab.');
  });
});
