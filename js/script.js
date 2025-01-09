var flashcards = JSON.parse(localStorage.getItem("data")) || [];
// console.log(flashcards);
var original = flashcards;
AddFavourite();

let currentIndex = 0;

const flashcardContainer = document.querySelector(".flashcard-container");
const quizContainer = document.querySelector(".quiz-container");
const questionEl = document.getElementById("card-question");
const answerEl = document.getElementById("card-answer");
const flipBtn = document.getElementById("flip-btn");
const switchToQuizBtn = document.getElementById("switch-to-quiz-btn");
const beginningCart = document.getElementById("to-the-beginning-btn");
const endCart = document.getElementById("to-the-end-btn");

function blendedFlashcard() {
  const blended = document.getElementById("blended-flashcard");
  const img = document.getElementById("blended-img");

  blended.addEventListener('change', () => {
    if (blended.checked) {
      flashcards = flashcards.map(element => element).sort(() => Math.random() - 0.5);
      img.src = "./image/random.png";
      showFlashcard();

    } else {
      flashcards = original;
      img.src = "./image/random1.png";
      showFlashcard();
    }
  });

}
blendedFlashcard();

function showFlashcard() {
  questionEl.textContent = flashcards[currentIndex].question;
  answerEl.textContent = flashcards[currentIndex].answer;
  displayStar();
}

flipBtn.addEventListener("click", () => {
  flipFlashcard();
});

function flipFlashcard() {
  const flashcard = document.querySelector(".flashcard");
  flashcard.classList.toggle("flip");
  setTimeout(() => {
    document.getElementById("save-word").classList.toggle("save-word1");
    // document.getElementById("save-word").classList.toggle("save-word2");
  }, 105);
}

const nextFlashcardBtn = document.getElementById("next-flashcard-btn");
nextFlashcardBtn.addEventListener("click", () => {
  displayStar()
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
  displayStar()
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
function displayPosition() {
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
    case "Enter":
      speak(flashcards[currentIndex].question);
      break;
    default:
      break;
  }
});

showFlashcard();
function speak(inputText) {
  // const inputText = document.getElementById("text-input").value; // Lấy giá trị văn bản từ ô input
  const utterance = new SpeechSynthesisUtterance(inputText); // Tạo đối tượng chứa văn bản cần đọc
  window.speechSynthesis.speak(utterance); // Đọc văn bản
}

document.getElementById("save-word").addEventListener("click", () => {
  // alert(document.querySelector("#save-word img").src);
  if (document.querySelector("#save-word img").src.endsWith("star.png")) {
    document.querySelector("#save-word img").src = "./image/star (1).png";
    flashcards[currentIndex].save = true;
    // alert(original[currentIndex].question === flashcards[currentIndex].question);
    saveFavourite(true);
  } else {
    document.querySelector("#save-word img").src = "./image/star.png";
    flashcards[currentIndex].save = false;
    saveFavourite(false);

  }
});
function saveFavourite(value){
  if (original[currentIndex].question === flashcards[currentIndex].question) {
    original[currentIndex].save = value;
  } else {
    for (let i = 0; i < original.length; i++) {
      if (original[i].question === flashcards[currentIndex].question) {
        original[i].save = value;
        break;
      }
    }
  }
  localStorage.setItem("data", JSON.stringify(original));
  AddFavourite();
}
function displayStar() {
  if (flashcards[currentIndex].save) {
    document.querySelector("#save-word img").src = "./image/star (1).png";
  } else document.querySelector("#save-word img").src = "./image/star.png";
}

function AddFavourite(){
  // var favouriteList = JSON.parse(localStorage.getItem("favouriteID")) || [];
  var favouriteList = [];
  for (let i=0;i<original.length;i++){
    if (original[i].save) favouriteList.push(original[i]);
  }
  localStorage.setItem("favouriteID",JSON.stringify(favouriteList));
  console.log(favouriteList);

}
