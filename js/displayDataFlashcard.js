var flashcards = JSON.parse(localStorage.getItem("data")) || [];
// localStorage.removeItem("data");
const displayFlashcardData = document.getElementById("display-flashcard-data");
const copydata = document.getElementById("box-copy-data");
const savechange = document.getElementById("save-change");
const cancelchange = document.getElementById("cancel-change");
displayFlashcardData.innerHTML = "";
function display(){
    flashcards.forEach((element, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
                <div class="box-data-flashcard">
                    <div class="data-order">No. ${index+1}</div>
                    <input class="question-data" type="text" placeholder="Question" value='${element.question}'>
                    <input class="answer-data" type="text" placeholder="Answer" value='${element.answer}'>
                </div>`;
        displayFlashcardData.appendChild(div);
        copydata.textContent += `${element.question} -- ${element.answer}\n`;
    });
    
}
display();
function copyContent() {
    // Lấy nội dung từ phần tử
    const textToCopy = document.getElementById('box-copy-data').textContent;

    // Sao chép nội dung vào clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Hiển thị thông báo "Đã sao chép"
      const notification = document.getElementById('notification');
      notification.classList.add('active');
      
      // Ẩn thông báo sau 2 giây
      setTimeout(() => {
        notification.classList.remove('active');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
  function saveChange(){
    savechange.addEventListener("click", () =>{
        const question = document.querySelectorAll(".box-data-flashcard .question-data");
        const answer = document.querySelectorAll(".box-data-flashcard .answer-data");
        var array = [];
        for (let  i = 0;   i< question.length;  i++) {
            array.push({question:question[i].value, answer:answer[i].value, annotation1:"", annotation2:""}); 
        }
        localStorage.setItem("data",JSON.stringify(array));
        alert("Lưu thành công");
        window.location.href = "mobie.html";
    });
    cancelchange.addEventListener("click", () => {
        window.location.href = "mobie.html";
    });

    
  }
  saveChange();

function DisplayDataOfFlashcards(){
    const btn = document.getElementById("display-data");
    const outputBox = document.getElementById("output-box");
    const cancel = document.getElementById("cancel-display-ouput-box");
    const displaychangedata = document.getElementById("display-and-change-data");

    btn.addEventListener("click", () => {
        outputBox.style.display = "flex";
    })

    cancel.addEventListener("click", () => {
        outputBox.style.display = "none";
    });

    displaychangedata.addEventListener('change', () => {
        if (displaychangedata.checked){
            document.getElementById("change-data-box").style.display = "block";
            document.getElementById("writer-img").src = "./image/writer2.png";
        } else {
            document.getElementById("change-data-box").style.display = "none";
            document.getElementById("writer-img").src = "./image/writer.png";
        }
    });

    
}
DisplayDataOfFlashcards();



