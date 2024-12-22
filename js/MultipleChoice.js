var flashcards = JSON.parse(localStorage.getItem("data")) || [];
console.log(flashcards);


let quizChoices = [];

const quizQuestionEl = document.getElementById("quiz-question");
const choiceBtns = document.querySelectorAll(".choice-btn");
const quizFeedbackEl = document.getElementById("quiz-feedback");
const nextQuestionBtn = document.getElementById("next-question-btn");


// Start Quiz
function startQuiz() {
    currentIndex = 0;
    showQuizQuestion();
}
startQuiz();

// Generate random choices for the quiz
function generateChoices(correctAnswer) {
    // Lấy danh sách đáp án từ flashcards
    const answers = flashcards.map((item) => item.answer);
    let choices = [correctAnswer];

    while (choices.length < 4) {
        // Chọn ngẫu nhiên các đáp án sai
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        if (!choices.includes(randomAnswer)) {
            choices.push(randomAnswer);
        }
    }

    // Xáo trộn các đáp án
    return choices.sort(() => Math.random() - 0.5);
}

// Show a quiz question
function showQuizQuestion() {
    // Xóa phản hồi trước đó
    quizFeedbackEl.textContent = "";

    // Lấy câu hỏi và đáp án hiện tại
    const currentQuestion = flashcards[currentIndex];
    quizQuestionEl.textContent = currentQuestion.question;

    // Tạo các lựa chọn
    quizChoices = generateChoices(currentQuestion.answer);

    // Hiển thị các lựa chọn trên giao diện
    choiceBtns.forEach((btn, index) => {
        btn.textContent = quizChoices[index];
        btn.disabled = false;
        btn.classList.remove("correct", "wrong");
    });
}
choiceBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const selectedAnswer = e.target.textContent;
        const correctAnswer = flashcards[currentIndex].answer;

        if (selectedAnswer === correctAnswer) {
            //   Vô hiệu hóa tất cả các nút sau khi chọn phương án đúng
            choiceBtns.forEach((button) => {button.disabled = true;});
            quizFeedbackEl.textContent = "Correct!";
            quizFeedbackEl.style.color = "green";
            e.target.classList.add("correct");
            setTimeout(() => {
                nextqs();
            }, 1000);

        } else {
            quizFeedbackEl.textContent = `Wrong! Correct answer is "${correctAnswer}".`;
            quizFeedbackEl.style.color = "red";
            e.target.classList.add("wrong");
        }
    });
});
nextQuestionBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % flashcards.length;
    showQuizQuestion();
});
function nextqs() {
    currentIndex = (currentIndex + 1) % flashcards.length;
    showQuizQuestion();
}