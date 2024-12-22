var flashcards = JSON.parse(localStorage.getItem("data")) || [];
console.log(flashcards);

let currentIndex = 0;

const flashcardContainer = document.querySelector(".flashcard-container");
const quizContainer = document.querySelector(".quiz-container");
const questionEl = document.getElementById("card-question");
const answerEl = document.getElementById("card-answer");
const flipBtn = document.getElementById("flip-btn");
const switchToQuizBtn = document.getElementById("switch-to-quiz-btn");
const beginningCart = document.getElementById("to-the-beginning-btn");
const endCart = document.getElementById("to-the-end-btn");

function showFlashcard() {
  questionEl.textContent = flashcards[currentIndex].question;
  answerEl.textContent = flashcards[currentIndex].answer;
}

flipBtn.addEventListener("click", () => {
  flipFlashcard();
});

function flipFlashcard() {
  const flashcard = document.querySelector(".flashcard");
  flashcard.classList.toggle("flip");
}

const nextFlashcardBtn = document.getElementById("next-flashcard-btn");
nextFlashcardBtn.addEventListener("click", () => {
  nextFlashcard();
});
function nextFlashcard() {
  currentIndex = (currentIndex + 1) % flashcards.length; // Lặp lại nếu hết câu hỏi
  showFlashcard();
  // Reset trạng thái thẻ (nếu đang lật thì quay lại mặt trước)
  const flashcard = document.querySelector(".flashcard");
  flashcard.classList.remove("flip");
}

const prevFlashcardBtn = document.getElementById("prev-flashcard-btn");
prevFlashcardBtn.addEventListener("click", () => {
  backFlashcard();
});

function backFlashcard() {
  currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length; // Quay vòng nếu ở câu đầu tiên
  showFlashcard();
  // Reset trạng thái thẻ (nếu đang lật thì quay lại mặt trước)
  const flashcard = document.querySelector(".flashcard");
  flashcard.classList.remove("flip");
}
beginningCart.addEventListener("click", () => {
  currentIndex = 0;
  showFlashcard();
});
endCart.addEventListener("click", () => {
  currentIndex = flashcards.length - 1;
  showFlashcard();
});

const position = document.getElementById("card-location");
function displayPosition(){
  position.textContent = (currentIndex + 1) + "/" + flashcards.length;
}
position.textContent = (currentIndex + 1) + "/" + flashcards.length;

document.getElementById("prev-flashcard-btn").addEventListener("click", () => {
  position.textContent = (currentIndex + 1) + "/" + flashcards.length;
});
document.getElementById("next-flashcard-btn").addEventListener("click", () => {
  position.textContent = (currentIndex + 1) + "/" + flashcards.length;
});

document.getElementById("to-the-beginning-btn").addEventListener("click", () => {
  position.textContent = (currentIndex + 1) + "/" + flashcards.length;
});

document.getElementById("to-the-end-btn").addEventListener("click", () => {
  position.textContent = (currentIndex + 1) + "/" + flashcards.length;
});

document.getElementById("card-location").addEventListener("click", () => {
  position.textContent = (currentIndex + 1) + "/" + flashcards.length;
});

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      flipFlashcard();
      break;
    case "ArrowDown":
      flipFlashcard();
      break;
    case "ArrowLeft":
      backFlashcard();
      displayPosition();
      break;
    case "ArrowRight":
      nextFlashcard();
      displayPosition();
      break;
    default:
      resultElement.textContent = "Đây không phải là phím mũi tên.";
      break;
  }
});

showFlashcard();
