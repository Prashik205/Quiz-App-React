import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./index.css";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Tool Markup Language",
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyperlinks Text Mark Language",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    correctAnswer: 2,
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    correctAnswer: 3,
  },
  {
    question: "Which hook is used for state in React?",
    options: ["useData", "useState", "useEffect", "useRef"],
    correctAnswer: 1,
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    correctAnswer: 1,
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Show confetti at the end if full score
  useEffect(() => {
    if (showResult && score === questions.length) {
      setShowConfetti(true);
    }
  }, [showResult, score]);

  const handleNext = () => {
    // Check answer
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setAnswerFeedback(true);
      setShowConfetti(true); // per-question confetti
    } else {
      setAnswerFeedback(false);
      setShowConfetti(false);
    }

    // Delay before next question
    setTimeout(() => {
      setSelectedOption(null);
      setAnswerFeedback(null);
      setShowConfetti(false);

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 2000); // 2 seconds to see effect
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnswerFeedback(null);
    setShowConfetti(false);
  };

  return (
    <div className="quiz-container">
      {showConfetti && (
        <Confetti numberOfPieces={250} gravity={0.3} recycle={false} />
      )}

      <h1>🎉 Quiz Application 🎉</h1>

      {showResult ? (
        <div className="result">
          <h2>
            {score === questions.length
              ? "🎉 Perfect Score! 🎉"
              : "Final Result"}
          </h2>
          <p>
            Score: {score} / {questions.length}
          </p>
          <button className="restart-btn" onClick={handleRestart}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="question-box">
          <h3>
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <p>{questions[currentQuestion].question}</p>

          <div className="options">
            {questions[currentQuestion].options.map((option, index) => {
              let optionClass = "option";
              if (answerFeedback !== null) {
                if (index === questions[currentQuestion].correctAnswer) {
                  optionClass += " correct";
                } else if (index === selectedOption) {
                  optionClass += " incorrect";
                }
              } else if (selectedOption === index) {
                optionClass += " selected";
              }

              return (
                <label key={index} className={optionClass}>
                  <input
                    type="radio"
                    name="option"
                    value={index}
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                    disabled={answerFeedback !== null}
                  />
                  {option}
                </label>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={selectedOption === null || answerFeedback !== null}
            className="next-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
