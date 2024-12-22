// DOM Elements
// DOM Elements cho chế độ Điền từ
const fillContainer = document.querySelector(".fill-container");
const fillInstruction = document.getElementById("fill-instruction");
const fillQuestion = document.getElementById("fill-question");
const fillInput = document.getElementById("fill-input");
const fillFeedback = document.getElementById("fill-feedback");
const submitFillBtn = document.getElementById("submit-fill-btn");
const nextFillBtn = document.getElementById("next-fill-btn");
const switchToFillBtn = document.getElementById("switch-to-fill-btn");
const fillSetup = document.querySelector(".fill-setup");
const fillModeRadios = document.querySelectorAll('input[name="fill-mode"]');
const fillCountInput = document.getElementById("fill-count");
const startFillBtn = document.getElementById("start-fill-btn");
const fillFinish = document.getElementById("fill-finish");
var flashcards = JSON.parse(localStorage.getItem("data")) || [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the capital of France?", answer: "Paris" }
];
let fillMode = "question"; // Mặc định là điền đáp án
let fillQuestions = []; // Lưu danh sách câu hỏi được chọn ngẫu nhiên
let fillQuestionLimit = 5; // Số lượng câu hỏi cần điền
var arr = [];

// Hiển thị giao diện cài đặt
switchToFillBtn.addEventListener("click", () => {
    const fillWordhrf = confirm("Bạn có muốn chuyển sang chế độ có thể nhập nhiều đáp án không");
    if (fillWordhrf) window.location.href = "fillWord.html";
    else {
        flashcardContainer.style.display = "none";
    quizContainer.style.display = "none";
    fillContainer.style.display = "none";
    fillFinish.style.display = "none";
    fillSetup.style.display = "block";
    startFillInTheBlank();
    }
});

function startFillInTheBlank() {
    const currentFlashcard = fillQuestions[currentIndex];

    // Hiển thị hướng dẫn theo chế độ
    fillInstruction.textContent = `Question ${currentIndex + 1}:`;
    // fillMode === "question" ? "Hãy điền đáp án đúng:" : "Hãy điền câu hỏi tương ứng:";

    // Hiển thị câu hỏi hoặc đáp án
    fillQuestion.textContent =
        fillMode === "question" ? currentFlashcard.question : currentFlashcard.answer;

    // Xóa nội dung của ô input và phản hồi
    fillInput.value = "";
    fillFeedback.textContent = "";
    // nextFillBtn.style.display = "none"; // Ẩn nút Next cho đến khi Submit
    nextFillBtn.style.display = "inline-block";
}



// --------
startFillBtn.addEventListener("click", () => {
    // Lấy chế độ được chọn (Điền đáp án hoặc Điền câu hỏi)
    fillMode = document.querySelector('input[name="fill-mode"]:checked').value;

    // Lấy số lượng câu hỏi từ người dùng
    fillQuestionLimit = Math.min(
        parseInt(fillCountInput.value) || 5,
        flashcards.length
    );
    setCount(fillQuestionLimit);

    // Chọn ngẫu nhiên các câu hỏi từ danh sách
    fillQuestions = [...flashcards]
        .sort(() => Math.random() - 0.5)
        .slice(0, fillQuestionLimit);

    // Ẩn giao diện cài đặt và bắt đầu chế độ Điền từ
    fillSetup.style.display = "none";
    fillContainer.style.display = "block";

    // Hiển thị câu hỏi đầu tiên
    currentIndex = 0;
    startFillInTheBlank();
});
function setCount(value) {
    for (let i = 0; i < value; i++) arr[i] = 0;
}
// ----------
// submitFillBtn.addEventListener("click", () => {
//     const currentFlashcard = fillQuestions[currentIndex];
//     const userAnswer = fillInput.value.trim();

//     const correctAnswer =
//         fillMode === "question" ? currentFlashcard.answer : currentFlashcard.question;
//     if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
//         fillFeedback.textContent = "Chính xác!";
//         fillFeedback.style.color = "green";
//         filltrue();
//     } else {
//         fillFeedback.textContent = `Sai! Đáp án đúng là: "${correctAnswer}".`;
//         fillFeedback.style.color = "red";
//     }
//     nextFillBtn.style.display = "inline-block";
// });
submitFillBtn.addEventListener("click", () => {
    const currentFlashcard = fillQuestions[currentIndex];
    const userAnswer = fillInput.value.trim();

    const correctAnswer =
        fillMode === "question" ? currentFlashcard.answer : currentFlashcard.question;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        fillFeedback.textContent = "Chính xác!";
        fillFeedback.style.color = "green";

        // Đợi 2 giây rồi chuyển câu
        setTimeout(() => {
            filltrue(); // Hàm chuyển sang câu hỏi tiếp theo
        }, 1000);
    } else {
        arr[currentIndex] = 1;
        fillFeedback.textContent = `Sai! Đáp án đúng là: "${correctAnswer}".`;
        fillFeedback.style.color = "red";

        // Hiển thị nút "Tiếp theo" nếu sai
        // nextFillBtn.style.display = "inline-block";
    }
});

document.getElementById('fill-input').addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        const currentFlashcard = fillQuestions[currentIndex];
        const userAnswer = fillInput.value.trim();

        const correctAnswer =
            fillMode === "question" ? currentFlashcard.answer : currentFlashcard.question;

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            fillFeedback.textContent = "Chính xác!";
            fillFeedback.style.color = "green";

            // Đợi 2 giây rồi chuyển câu
            setTimeout(() => {
                filltrue(); // Hàm chuyển sang câu hỏi tiếp theo
            }, 1000);
        } else {
            arr[currentIndex] = 1;
            fillFeedback.textContent = `Sai! Đáp án đúng là: "${correctAnswer}".`;
            fillFeedback.style.color = "red";

            // Hiển thị nút "Tiếp theo" nếu sai
            // nextFillBtn.style.display = "inline-block";
        }
    }
});

// ----------------
function filltrue() {
    // Chuyển sang câu tiếp theo
    currentIndex++;

    if (currentIndex < fillQuestions.length) {
        startFillInTheBlank();
    } else {
        // fillFeedback.textContent = "Bạn đã hoàn thành chế độ Điền từ!";
        // fillFeedback.style.color = "blue";
        fillContainer.style.display = "none";
        // fillFinish.textContent = "Bạn đã hoàn thành xuất sắc!";
        // fillFinish.style.color = "blue";
        // fillFinish.style.display = "block";
        // Ẩn nút Next
        // nextFillBtn.style.display = "none";
        var count = 0;
        for (let i = 0; i < fillQuestionLimit; i++) {
            if (arr[i] == 1) count++;
        }
        showFinishScreen(((fillQuestionLimit - count) / fillQuestionLimit) * 10, fillQuestionLimit - count, count)


    }
}
// -------------
nextFillBtn.addEventListener("click", () => {
    arr[currentIndex] = 1;
    // Chuyển sang câu tiếp theo
    currentIndex++;

    if (currentIndex < fillQuestions.length) {
        startFillInTheBlank();
    } else {
        // fillFeedback.textContent = "Bạn đã hoàn thành chế độ Điền từ!";
        // fillFeedback.style.color = "blue";
        fillContainer.style.display = "none";
        // fillFinish.textContent = "Bạn đã hoàn thành xuất sắc!";
        // fillFinish.style.color = "blue";
        // fillFinish.style.display = "block";
        var count = 0;
        for (let i = 0; i < fillQuestionLimit; i++) {
            if (arr[i] == 1) count++;
        }
        showFinishScreen(((fillQuestionLimit - count) / fillQuestionLimit) * 10, fillQuestionLimit - count, count)
        // Ẩn nút Next
        // nextFillBtn.style.display = "none";
    }
});
// Cập nhật điểm và câu hỏi
function showFinishScreen(score, correct, wrong) {
    const finishScreen = document.getElementById("fill-finish");
    const scoreElement = document.getElementById("fill-score");
    const correctElement = document.getElementById("fill-correct");
    const wrongElement = document.getElementById("fill-wrong");

    // Cập nhật nội dung
    scoreElement.textContent = `Điểm số: ${score}`;
    correctElement.textContent = `Số câu đúng: ${correct}`;
    wrongElement.textContent = `Số câu sai: ${wrong}`;

    // Hiển thị màn hình chúc mừng
    finishScreen.style.display = "block";
}

