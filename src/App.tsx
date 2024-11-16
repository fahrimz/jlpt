import "./App.css";
import { OptionButton } from "@components";
import {
  getAnswerOptions,
  getRandomItems,
  getShownJapanese,
  sleep,
} from "@utility";
import { n5Dictionary, TWord } from "@data";
import { useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const audioCorrectAnswer = new Audio("src/assets/audio/correct.mp4");
const audioIncorrectAnswer = new Audio("src/assets/audio/incorrect.mp4");
const questions = getRandomItems(n5Dictionary, 5);

const QuizView = ({
  questionIndex,
  currentQuestion,
  answers,
  checkAnswer,
}: {
  questionIndex: number,
  currentQuestion: TWord;
  answers: string[];
  checkAnswer: (option: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-8">
      <h1>{currentQuestion.english}</h1>
      <div className="space-x-4">
        {answers.map((option) => (
          <OptionButton
            key={option}
            option={option}
            onClick={() => {
              checkAnswer(option);
            }}
          />
        ))}
      </div>

      <h6>
        {questionIndex + 1} / {questions.length}
      </h6>
    </div>
  );
};

const QuizCompletedView = ({
  correctAnswers,
  onRetry,
}: {
  correctAnswers: number;
  onRetry: () => void;
}) => {
  return (
    <div className="space-y-4">
      <h1>Quiz completed!</h1>
      <h2>Correct answers: {correctAnswers}</h2>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
};

function App() {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQuestion = useMemo(
    () => (questionIndex < questions.length ? questions[questionIndex] : null),
    [questionIndex]
  );

  const answers = useMemo(
    () =>
      currentQuestion ? getAnswerOptions(currentQuestion, n5Dictionary) : null,
    [currentQuestion]
  );

  const onRetry = () => {
    window.location.reload();
  };

  const checkAnswer = async (option: string) => {
    if (!currentQuestion) {
      return;
    }

    if (option === getShownJapanese(currentQuestion)) {
      setCorrectAnswers(correctAnswers + 1);
      void audioCorrectAnswer.play();
      toast.success("Answer correct!");
    } else {
      void audioIncorrectAnswer.play();
      toast.error("Answer incorrect!");
    }

    await sleep(1000);
    setQuestionIndex((prev) => prev + 1);
  };

  return (
    <>
      <div className="flex flex-col gap-32">
        <div className="flex gap-2 justify-center">
          <h5 className="font-bold text-xl">
            JLPT N5 Verbs
          </h5>
        </div>
        {currentQuestion && answers ? (
          <QuizView
            questionIndex={questionIndex}
            currentQuestion={currentQuestion}
            answers={answers}
            checkAnswer={(option) => {
              void checkAnswer(option);
            }}
          />
        ) : (
          <QuizCompletedView
            correctAnswers={correctAnswers}
            onRetry={onRetry}
          />
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        closeOnClick
        autoClose={1000}
      />
    </>
  );
}

export default App;
