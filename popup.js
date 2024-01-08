document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("saveButton");
  const blockListInput = document.getElementById("blockList");

  saveButton.addEventListener("click", function () {
    const keywords = blockListInput.value
      .split(",")
      .map((keyword) => keyword.trim());
    chrome.storage.sync.set({ blockedKeywords: keywords }, function () {
      alert("Blocked keywords saved!");
    });
  });
});
