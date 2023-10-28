//adding an API

const questions = [];

const api =
    "https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple";
fetch(api)
    .then((response) => response.json())
    .then((data) => {
        let result = data.results;
        result.map((item) => {
            let questionObj = {
                question: item.question,
                options: [...item.incorrect_answers, item.correct_answer],
                answer: item.correct_answer,
            };
            questions.push(questionObj);
            console.log(questionObj);
        });

        //for a loader
        document.querySelector(".game").style.display = "block";
        document.querySelector(".loader").style.display = "none";

        let question = document.querySelector(".ques");
        let options1 = document.querySelector(".options1");
        let options2 = document.querySelector(".options2");
        let options3 = document.querySelector(".options3");
        let options4 = document.querySelector(".options4");

        let currentQuestion = 0;
        let currentAnswer = 0;

        questions.sort(() => Math.random() - 0.5);

        //innerHtml helped solve the problem of simbols not converting to texts

        question.innerHTML = questions[currentQuestion].question;
        options1.innerHTML = questions[currentQuestion].options[0];
        options2.innerHTML = questions[currentQuestion].options[1];
        options3.innerHTML = questions[currentQuestion].options[2];
        options4.innerHTML = questions[currentQuestion].options[3];

        let buttons = document.querySelectorAll("button");
        for (const button of buttons) {
            button.addEventListener("click", () => {
                console.log("clicked");

                if (button.innerText === questions[currentQuestion].answer) {
                    button.style.background = "green";
                    //for correct and wrong answer
                    currentAnswer++;
                } else {
                    button.style.background = "red";
                }

                const btns = [options1, options2, options3, options4];
                btns.map((btn) => {
                    btn.disabled = true;
                });

                currentQuestion++;

                //gameover

                setTimeout(() => {
                    if (currentQuestion === 15) {
                        document.querySelector(".game").style.display = "none";
                        document.querySelector(".gameOver").style.display = "grid";
                    }
                }, 2000);

                setTimeout(() => {
                    btns.map((btn) => {
                        btn.disabled = false;
                    });
                    button.style.background = "white";
                    question.innerText = questions[currentQuestion].question;
                    options1.innerHTML = questions[currentQuestion].options[0];
                    options2.innerHTML = questions[currentQuestion].options[1];
                    options3.innerHTML = questions[currentQuestion].options[2];
                    options4.innerHTML = questions[currentQuestion].options[3];

                    //for the question count
                    document.querySelector(".questionCount").innerText =
                        currentQuestion + 1;
                }, 2000);
                //for correct and wrong answer
                document.querySelector(".score").textContent = currentAnswer;
            });
        }
    });

function playAgain() {
    location.reload();
}