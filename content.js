chrome.storage.sync.get(["blockedKeywords"], function (result) {
  const blockedKeywords = result.blockedKeywords || [];

  blockVideos(blockedKeywords);

  // Observe changes in the DOM to detect dynamically loaded videos
  const observer = new MutationObserver(function () {
    blockVideos(blockedKeywords);
  });

  // Set up observer to watch for changes in the video container
  const videoContainer =
    document.querySelector("ytd-rich-grid-renderer") ||
    document.querySelector("ytd-item-section-renderer");
  if (videoContainer) {
    observer.observe(videoContainer, { childList: true, subtree: true });
  }

  function blockVideos(keywords) {
    const videoElements = document.querySelectorAll("ytd-thumbnail");

    videoElements.forEach((videoElement) => {
      const titleElement = videoElement.querySelector("#video-title");
      if (titleElement) {
        const videoTitle = titleElement.innerText.toLowerCase();
        if (containsBlockedKeyword(videoTitle, keywords)) {
          // Hide the entire video container
          const videoContainer =
            videoElement.closest("ytd-grid-video-renderer") ||
            videoElement.closest("ytd-rich-grid-media");
          if (videoContainer) {
            videoContainer.style.display = "none";
          }
        }
      }
    });
  }

  function containsBlockedKeyword(text, keywords) {
    return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
  }
});
