// DOM Elements cho chế độ Điền từ
const fillContainer = document.querySelector(".fill-container");
const fillInstruction = document.getElementById("fill-instruction");
const fillQuestion = document.getElementById("fill-question");
const fillInput = document.getElementById("fill-input");
const fillFeedback = document.getElementById("fill-feedback");
const submitFillBtn = document.getElementById("submit-fill-btn");
const nextFillBtn = document.getElementById("next-fill-btn");
const switchToFillBtn = document.getElementById("switch-to-fill-btn");
switchToFillBtn.addEventListener("click", () => {
    // Ẩn các chế độ khác và hiển thị chế độ Điền từ
    flashcardContainer.style.display = "none";
    quizContainer.style.display = "none";
    fillContainer.style.display = "block";

    // Khởi tạo câu hỏi đầu tiên
    currentIndex = 0;
    startFillInTheBlank();
});
function startFillInTheBlank() {
    const currentFlashcard = flashcards[currentIndex];

    // Ngẫu nhiên chọn hiển thị câu hỏi hoặc đáp án
    const isFillingAnswer = Math.random() > 0.5;

    if (isFillingAnswer) {
        // Người dùng phải điền đáp án
        fillInstruction.textContent = "Điền đáp án đúng cho câu hỏi sau:";
        fillQuestion.textContent = currentFlashcard.question;
    } else {
        // Người dùng phải điền câu hỏi
        fillInstruction.textContent = "Dựa vào đáp án sau, hãy điền lại câu hỏi:";
        fillQuestion.textContent = currentFlashcard.answer;
    }

    // Xóa input và phản hồi trước đó
    fillInput.value = "";
    fillFeedback.textContent = "";
}

submitFillBtn.addEventListener("click", () => {
    const currentFlashcard = flashcards[currentIndex];
    const userAnswer = fillInput.value.trim();

    const isFillingAnswer = fillInstruction.textContent.includes("đáp án");
    const correctAnswer = isFillingAnswer ? currentFlashcard.answer : currentFlashcard.question;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        fillFeedback.textContent = "Chính xác!";
        fillFeedback.style.color = "green";
    } else {
        fillFeedback.textContent = `Sai! Đáp án đúng là: "${correctAnswer}".`;
        fillFeedback.style.color = "red";
    }
});

nextFillBtn.addEventListener("click", () => {
    // Chuyển sang câu tiếp theo
    currentIndex = (currentIndex + 1) % flashcards.length;
    startFillInTheBlank();
});
