import { useState } from "react";
import "./index.css";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Tool Markup Language",
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyperlinks Text Mark Language"
    ],
    correctAnswer: 1
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    correctAnswer: 2
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    correctAnswer: 3
  },
  {
    question: "Which hook is used for state in React?",
    options: ["useData", "useState", "useEffect", "useRef"],
    correctAnswer: 1
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    correctAnswer: 1
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setSelectedOption(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz Application</h1>

      {showResult ? (
        <div className="result">
          <h2>Final Result</h2>
          <p>
            Score: {score} / {questions.length}
          </p>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question-box">
          <h3>
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <p>{questions[currentQuestion].question}</p>

          {questions[currentQuestion].options.map((option, index) => (
            <label
              key={index}
              className={`option ${
                selectedOption === index ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="option"
                value={index}
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
              />
              {option}
            </label>
          ))}

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
