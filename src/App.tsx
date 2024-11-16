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
  currentItem,
  answers,
  checkAnswer,
}: {
  currentItem: TWord;
  answers: string[];
  checkAnswer: (option: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-8">
      <h1>{currentItem.english}</h1>
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
  const [currentItem, setCurrentItem] = useState<TWord>(questions[0]);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentItemIndex = useMemo(
    () => questions.indexOf(currentItem),
    [currentItem]
  );

  const answers = useMemo(
    () => getAnswerOptions(currentItem, n5Dictionary),
    [currentItem]
  );

  const onRetry = () => {
    window.location.reload();
  };

  const checkAnswer = async (option: string) => {
    if (option === getShownJapanese(currentItem)) {
      setCorrectAnswers(correctAnswers + 1);
      void audioCorrectAnswer.play();
      toast.success("Answer correct!");
    } else {
      void audioIncorrectAnswer.play();
      toast.error("Answer incorrect!");
    }

    await sleep(1000);
    if (currentItemIndex < questions.length - 1) {
      setCurrentItem(questions[currentItemIndex + 1]);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-32">
        <div className="flex gap-2 justify-center">
          <h5 className="font-bold text-xl">
            {/* {currentItemIndex + 1} / {questions.length} */}
            JLPT N5 Verbs
          </h5>
        </div>
        {currentItemIndex <= answers.length ? (
          <QuizView
            currentItem={currentItem}
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
      <ToastContainer position="bottom-right" theme="dark" closeOnClick autoClose={1000} />
    </>
  );
}

export default App;
