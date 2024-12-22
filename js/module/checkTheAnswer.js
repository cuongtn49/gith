export default function checkTheAnswer(KeySolve, answer){
    if (KeySolve.length>0 && answer.length>0){
            const yourAnswer = KeySolve.trim();
            const answerList = answer.split(",").map(a => a.trim());
            const yourAnswerList = yourAnswer.split(",").map(a => a.trim());
            const isRight = yourAnswerList.every(ans => answerList.includes(ans));
            return isRight;
    }
}