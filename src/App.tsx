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

import audioCorrect from "./assets/audio/correct.mp4";
import audioIncorrect from "./assets/audio/incorrect.mp4";

const audioCorrectAnswer = new Audio(audioCorrect);
const audioIncorrectAnswer = new Audio(audioIncorrect);

const TOTAL_QUESTION = 10;
const questions = getRandomItems(n5Dictionary, TOTAL_QUESTION);

const QuizView = ({
  questionIndex,
  currentQuestion,
  answers,
  checkAnswer,
}: {
  questionIndex: number;
  currentQuestion: TWord;
  answers: string[];
  checkAnswer: (option: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-8 justify-center">
      <h1>{currentQuestion.english}</h1>
      <div className="flex gap-4 flex-col sm:flex-row sm:justify-center">
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

      <p>
        {questionIndex + 1} / {questions.length}
      </p>
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
      <h4 className="font-bold text-3xl">Quiz completed!</h4>
      <p>Correct answers: {correctAnswers}</p>
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
      <div className="flex flex-col gap-32 ">
        <div className="flex gap-2 justify-center">
          <h1 className="font-bold text-xl">JLPT N5 Vocab</h1>
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
