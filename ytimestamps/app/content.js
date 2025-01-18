chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const video = document.querySelector('video');
  if (request.action === 'saveTimestamp') {
    const timestamp = video.currentTime;
    sendResponse({ timestamp });
  } else if (request.action === 'setTimestamp') {
    video.currentTime = request.timestamp;
  }
});
