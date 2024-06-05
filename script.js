// Check if the browser supports the Web Speech API
if (!("webkitSpeechRecognition" in window)) {
  alert(
    "Your browser does not support the Web Speech API. Please use Google Chrome or another supported browser."
  );
} else {
  // Initialize the speech recognition object
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true; // Keep recognizing speech continuously
  recognition.interimResults = false; // Do not show interim results

  const languageSelect = document.getElementById("languageSelect");
  const startButton = document.getElementById("startButton");
  const clearButton = document.getElementById("clearButton");
  const downloadButton = document.getElementById("downloadButton");
  const animation = document.getElementById("animation");
  const resultElement = document.getElementById("result");
  let isRecognizing = false;

  // Update the recognition language when the selection changes
  languageSelect.addEventListener("change", () => {
    recognition.lang = languageSelect.value;
  });

  // Set the initial language
  recognition.lang = languageSelect.value;

  // Start or stop recognition on button click
  startButton.addEventListener("click", () => {
    if (isRecognizing) {
      recognition.stop();
    } else {
      recognition.start();
    }
  });

  // Clear the result text and reset the app
  clearButton.addEventListener("click", () => {
    resultElement.innerText = "";
    downloadButton.style.display = "none";
    clearButton.style.display = "none"; // Hide clear button
  });

  // Update button text and show animation when recognition starts
  recognition.onstart = () => {
    isRecognizing = true;
    startButton.innerText = "Stop Noting";
    animation.style.display = "block";
  };

  // Display the result when speech is recognized
  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    resultElement.innerText += transcript + " ";
    downloadButton.style.display = "inline-block"; // Show the download button
    clearButton.style.display = "inline-block"; // Show the clear button
    clearButton.style.marginLeft = "10px"; // Add margin between the buttons
  };

  // Handle errors
  recognition.onerror = (event) => {
    console.error("Speech recognition error detected: " + event.error);
  };

  // Update button text and hide animation when recognition ends
  recognition.onend = () => {
    isRecognizing = false;
    startButton.innerText = "Start Noting";
    animation.style.display = "none";
  };

  // Download the recognized text as a .txt file
  downloadButton.addEventListener("click", () => {
    const text = resultElement.innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const anchor = document.createElement("a");
    anchor.download = "recognized_text.txt";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
  });
}
