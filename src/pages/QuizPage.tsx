import { OptionButton } from "@components";
import {
  Constants,
  getAnswerOptions,
  getRandomItems,
  getShownJapanese,
  sleep,
  Storage,
} from "@utility";
import { n5BookmarkDictionary, n5Dictionary, TWord } from "@data";
import { useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import audioCorrect from "../assets/audio/correct.mp4";
import audioIncorrect from "../assets/audio/incorrect.mp4";
import { Link } from "@tanstack/react-router";

type TQuizType = "n5" | "n5Bookmark";

const audioCorrectAnswer = new Audio(audioCorrect);
const audioIncorrectAnswer = new Audio(audioIncorrect);

const questionsBank = {
  n5: n5Dictionary,
  n5Bookmark: n5BookmarkDictionary(),
};

const BookmarkView = ({
  currentQuestion,
  quizType,
}: {
  currentQuestion: TWord;
  quizType: TQuizType;
}) => {
  const [bookmarked, setBookmarked] = useState(
    Storage.isN5WordBookmarked(currentQuestion.id)
  );

  if (quizType === "n5") {
    if (bookmarked) {
      return (
        <button className="self-center text-sm disabled:opacity-70" disabled>
          Bookmarked ✔️
        </button>
      );
    }

    return (
      <button
        className="self-center text-sm"
        onClick={() => {
          Storage.toggleN5DictBookmark(currentQuestion.id);
          setBookmarked(true);
        }}
      >
        Bookmark this word
      </button>
    );
  }

  // if (quizType === "n5Bookmark") {
  if (bookmarked) {
    return (
      <button
        className="self-center text-sm"
        onClick={() => {
          Storage.toggleN5DictBookmark(currentQuestion.id);
          setBookmarked(false);
        }}
      >
        Remove bookmark
      </button>
    );
  }
  // }
};

const QuizView = ({
  quizType,
  questionIndex,
  currentQuestion,
  totalQuestions,
  answers,
  checkAnswer,
}: {
  quizType: TQuizType;
  questionIndex: number;
  currentQuestion: TWord;
  totalQuestions: number;
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
        {questionIndex + 1} / {totalQuestions}
      </p>

      <BookmarkView currentQuestion={currentQuestion} quizType={quizType} />
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

interface QuizPageProps {
  quizType: TQuizType;
  preferredTotalQuestions: number;
}

export function QuizPage({
  quizType = "n5",
  preferredTotalQuestions = Constants.defaultTotalQuestion,
}: QuizPageProps) {
  const bank = questionsBank[quizType];
  const answerBank = useMemo(
    () => (["n5", "n5Bookmark"].includes(quizType) ? n5Dictionary : []),
    [quizType]
  );
  const totalQuestions = Math.min(preferredTotalQuestions, bank.length);

  const questions = useMemo(
    () => getRandomItems(bank, totalQuestions),
    [bank, totalQuestions]
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQuestion = useMemo(
    () => (questionIndex < questions.length ? questions[questionIndex] : null),
    [questionIndex, questions]
  );

  const answers = useMemo(
    () =>
      currentQuestion ? getAnswerOptions(currentQuestion, answerBank) : null,
    [answerBank, currentQuestion]
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

  const renderBody = () => {
    if (bank.length === 0) {
      return (
        <div>
          <p>Quiz not available.</p>
          {quizType === "n5Bookmark" && (
            <p>
              Bookmark some words from <Link to="/n5quiz">this quiz</Link>{" "}
              to start the quiz
            </p>
          )}
        </div>
      );
    }

    if (currentQuestion && answers) {
      return (
        <QuizView
          quizType={quizType}
          questionIndex={questionIndex}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          answers={answers}
          checkAnswer={(option) => {
            void checkAnswer(option);
          }}
        />
      );
    }

    if (questionIndex >= totalQuestions) {
      return (
        <QuizCompletedView correctAnswers={correctAnswers} onRetry={onRetry} />
      );
    }
  };

  return (
    <>
      <div className="flex flex-col gap-32 ">
        <div className="flex gap-2 justify-center">
          <h1 className="font-bold text-xl">JLPT N5 Vocab</h1>
        </div>
        {renderBody()}
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
