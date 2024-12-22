
function speak() {
    const inputText = document.getElementById("text-input").value; // Lấy giá trị văn bản từ ô input
    const utterance = new SpeechSynthesisUtterance(inputText); // Tạo đối tượng chứa văn bản cần đọc
    window.speechSynthesis.speak(utterance); // Đọc văn bản
}