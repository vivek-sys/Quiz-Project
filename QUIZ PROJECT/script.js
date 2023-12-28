const question = [
    {
        question: "Full Form of HTML",
        answers: [
            { text: "Hyper Text Manipulation Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hydro Text Manipulation Language", correct: false },
            { text: "Hyper Textile Markup Language", correct: false },
        ]
    },
    {
        question: "Full Form of CSS",
        answers: [
            { text: "Caste Style Sheets", correct: false },
            { text: "Cascading Styling Sheet", correct: true },
            { text: "Color Styling Sheets", correct: false },
            { text: "Cascading Sheets Style", correct: false },
        ]
    },
    {
        question: "Which Tag allows you to add a row in a table",
        answers: [
            { text: "tr", correct: true },
            { text: "td", correct: false },
            { text: "rw", correct: false },
            { text: "th", correct: false },
        ]
    },
    {
        question: "What will be added by using <td> </td> tag",
        answers: [
            { text: "column", correct: false },
            { text: "step", correct: false },
            { text: "row", correct: false },
            { text: "cell", correct: true },
        ]
    }
]
const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-button")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion() {
    resetState()
    let currentQuestion = question[currentQuestionIndex]
    let questionNO = currentQuestionIndex + 1
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question
    // display answer in the button
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })

}
function resetState() {
    nextButton.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }

}

function selectAnswer(e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score++
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextButton.style.display = "block"
}

function showScore() {
    resetState()
    questionElement.innerHTML = `you scored ${score} out of ${question.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < question.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz()