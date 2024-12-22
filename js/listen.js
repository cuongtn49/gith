import checkTheAnswer from './module/checkTheAnswer.js';
var flashcards = JSON.parse(localStorage.getItem("data")) || [];
const formBtn = document.getElementById("formBtn");
const form = document.getElementById("settings-container");
const boxQuestion = document.getElementById("listenBoxQuestion");
const checkAnswerBtn = document.getElementById("checkAnswerBtn");
const nextBtn = document.getElementById("nextBtn");
const suggestBtn = document.getElementById("suggestBtn");
var dataList = [];
var index = 0;
var checkAssignment = [];
var formatFill = true;
document.getElementById("question-count").value = flashcards.length;
function setCheckAssignment(data) {
    for (let i = 0; i < data.length; i++) {
        checkAssignment[i] = 0;
    }
}
function correctNumber(data) {
    var count = 0;
    for (let i = 0; i < data.length; i++) {
        if (parseInt(checkAssignment[i]) === 0) {
            count++;
        }
    }
    return count;
}

formBtn.addEventListener("click", () => {
    alert("Chỉ chấm điểm cho câu trả lời đầu tiên của mỗi câu hỏi.");
    const numberQuestionSet = document.getElementById("question-count").value;
    const fillQustionSet = document.getElementById("fillQustion").checked;
    // const fillAnswerSet = document.getElementById("fillAnswer").checked;
    formatFill = fillQustionSet;
    dataList = setData(flashcards, numberQuestionSet);
    setCheckAssignment(dataList);
    form.style.display = "none";
    boxQuestion.style.display = "block";
    displayQS(dataList, index);
});
function setData(originData, numberQuestion) {
    var newData = [...originData]
        // .sort(() => Math.random() - 0.5)
        .slice(0, numberQuestion);
    newData = newData.map(element => {
        return {question:element.question, answer:element.answer, yourAnswer: ""};
    });
    if (document.getElementById("option-random").checked) newData.sort(() => Math.random() - 0.5);
    return newData;
}
function displayQS(data, index) {
    speak(data[index].question.toString());
    document.getElementById("numberQuestion").textContent = `Question ${index + 1}`;
    const loudspeakerQuestion = document.getElementById("loudspeakerQuestion");
    loudspeakerQuestion.onclick = function () {
        speak(data[index].question.toString());
    }
    // loudspeakerQuestion.addEventListener("mouseover", () => {

    //     setTimeout(() => {
    //         speak(data[index].question.toString());
    //     }, 1000); // Delay 500ms
    // });
    const listenFillPlace = document.getElementById("listenFillPlace");
    listenFillPlace.disabled = false;
    listenFillPlace.value = "";
    listenFillPlace.style.background = "white";
    listenFillPlace.focus();
    if (document.getElementById("option-limit-length").checked){
        if (formatFill === true) listenFillPlace.maxLength = data[index].question.length;
        else listenFillPlace.maxLength = data[index].answer.length;
    }
    document.getElementById("suggestBtn").disabled = true;
    // alert(data[index].question.length);
    // alert(data[index].question);
}
function checkAnswerFunction() {
    const textFill = document.getElementById("listenFillPlace");
    if (dataList[index].yourAnswer.length>0) dataList[index].yourAnswer += " - " + textFill.value;
    else dataList[index].yourAnswer = textFill.value; 
    if (formatFill === true) {
        if (dataList[index].question.toString().toUpperCase() === textFill.value.toString().toUpperCase()) {
            textFill.style.background = "rgba(0, 255, 0, 0.2)";
            textFill.disabled = true;

            setTimeout(() => {
                nextQuestion();
            }, 1000);
        } else {
            checkAssignment[index] = 1;
            textFill.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
            textFill.value = "";
            textFill.focus();
            document.getElementById("suggestBtn").disabled = false;
        }
    } else {
        // if (dataList[index].answer.toString().toUpperCase() === textFill.value.toString().toUpperCase()) {
        if (checkTheAnswer(textFill.value.toString().toUpperCase(), dataList[index].answer.toString().toUpperCase())) {
            textFill.style.background = "rgba(0, 255, 0, 0.2)";
            textFill.disabled = true;

            setTimeout(() => {
                nextQuestion();
            }, 1000);
        } else {
            checkAssignment[index] = 1;
            textFill.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
            textFill.value = "";
            textFill.focus();
            document.getElementById("suggestBtn").disabled = false;
        }
    }
}
function focusFillBox() {
    document.getElementById("listenFillPlace").focus();
}
checkAnswerBtn.addEventListener("click", () => {
    checkAnswerFunction();
});
document.getElementById("listenFillPlace").addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        checkAnswerFunction();
    }
});

nextBtn.addEventListener("click", () => {
    checkAssignment[index] = 1;
    nextQuestion();
});
function nextQuestion() {
    if (index < dataList.length - 1) {
        index++;
        displayQS(dataList, index);
    } else {
        showFinishScreen(parseFloat((correctNumber(dataList) / dataList.length) * 10), correctNumber(dataList), dataList.length - correctNumber(dataList));
    }
}
suggestBtn.addEventListener("click", () => {
    if (formatFill === true) alert(dataList[index].question);
    else alert(dataList[index].answer);
    focusFillBox();
});



function speak(inputText) {
    // const inputText = document.getElementById("text-input").value; // Lấy giá trị văn bản từ ô input
    const utterance = new SpeechSynthesisUtterance(inputText); // Tạo đối tượng chứa văn bản cần đọc
    window.speechSynthesis.speak(utterance); // Đọc văn bản
}

function showFinishScreen(score, correct, wrong) {
    document.getElementById("listenBoxQuestion").style.display = "none";
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
    review();
}
const reviewBox = document.getElementById("detailed-review");
const dataRow = document.getElementById("table-body");
function review() {
    dataRow.innerHTML = "";
    for (let i = 0; i < dataList.length; i++) {
        const tr = document.createElement("tr");
        tr.innerHTML =
            `<td>${i + 1}</td>
        <td>${dataList[i].question}</td>
        <td>${dataList[i].yourAnswer}</td>
        <td>${dataList[i].answer}</td>`;
        dataRow.appendChild(tr);
    }
    reviewBox.style.display = "block";
}


