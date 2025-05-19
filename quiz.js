const quizContainer = document.getElementById("quiz-container");

// Fetch 4 random facts for the quiz
async function getFactsForQuiz() {
  let facts = JSON.parse(localStorage.getItem("savedFacts")) || [];

  while (facts.length < 4) {
    const res = await fetch("https://catfact.ninja/fact");
    const data = await res.json();
    if (!facts.includes(data.fact)) {
      facts.push(data.fact);
    }
  }

  // Randomly pick 4 facts
  const shuffledFacts = [...facts].sort(() => Math.random() - 0.5).slice(0, 4);
  return shuffledFacts;
}

// Load a new quiz question
async function loadNewQuestion() {
  quizContainer.innerHTML = "";
  const facts = await getFactsForQuiz();

  // Randomly pick one fact as the correct answer
  const correctFact = facts[Math.floor(Math.random() * facts.length)];

  createQuestion(facts, correctFact);
}

// Display the question and answers
function createQuestion(facts, correctFact) {
  const questionBox = document.createElement("div");
  questionBox.classList.add("question-box");

  const questionText = document.createElement("p");
  questionText.textContent = "Which of the following is a real cat fact?";
  questionBox.appendChild(questionText);

  // Shuffle the display order
  const shuffledOptions = [...facts].sort(() => Math.random() - 0.5);

  shuffledOptions.forEach((fact) => {
    const btn = document.createElement("button");
    btn.textContent = fact;
    btn.classList.add("answer-btn");
    btn.addEventListener("click", () => {
      if (fact === correctFact) {
        alert("✅ Correct! Here's your next question.");
        loadNewQuestion();
      } else {
        alert("❌ Nope, try again!");
      }
    });
    questionBox.appendChild(btn);
  });

  quizContainer.appendChild(questionBox);
}

// Start the quiz
loadNewQuestion();