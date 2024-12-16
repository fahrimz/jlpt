import { OptionButton, Stopwatch } from "@components";
import {
  Constants,
  getAnswerOptions,
  getRandomItems,
  getShownJapanese,
  sleep,
  Storage,
} from "@utility";
import {
  n5BookmarkDictionary,
  n5Dictionary,
  ScoreboardItem,
  TWord,
} from "@data";
import { useEffect, useMemo, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import audioCorrect from "../assets/audio/correct.mp4";
import audioIncorrect from "../assets/audio/incorrect.mp4";
import { Link } from "@tanstack/react-router";
import { StopwatchImperativeHandle } from "src/components/Stopwatch";

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

  const toggleBookmark = () => {
    Storage.toggleN5DictBookmark(currentQuestion.id);
    setBookmarked((prev) => !prev);
  };

  useEffect(() => {
    const isBookmarked = Storage.isN5WordBookmarked(currentQuestion.id);
    setBookmarked(isBookmarked);
  }, [currentQuestion.id]);

  if (quizType === "n5") {
    if (bookmarked) {
      return (
        <button
          className="self-center text-sm disabled:opacity-70"
          onClick={toggleBookmark}
        >
          Bookmarked ✔️
        </button>
      );
    }

    return (
      <button className="self-center text-sm" onClick={toggleBookmark}>
        Bookmark this word
      </button>
    );
  }

  // if (quizType === "n5Bookmark") {
  if (bookmarked) {
    return (
      <button className="self-center text-sm" onClick={toggleBookmark}>
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
  timeTakenArray,
}: {
  correctAnswers: number;
  onRetry: () => void;
  timeTakenArray: number[];
}) => {
  const scoreboard: ScoreboardItem = useMemo(
    () => ({
      createdAt: new Date().toISOString(),
      correctAnswers,
      totalTimeTaken: timeTakenArray.reduce((acc, curr) => acc + curr, 0),
      longestTimeToAnswer: Math.max(...timeTakenArray),
      shortestTimeToAnswer: Math.min(...timeTakenArray),
    }),
    [correctAnswers, timeTakenArray]
  );

  const statistics = [
    {
      label: "Correct Answers",
      value: scoreboard.correctAnswers,
    },
    {
      label: "Total Time Taken",
      value: `${scoreboard.totalTimeTaken.toString()} seconds`,
    },
    {
      label: "Longest Time to Answer",
      value: `${scoreboard.longestTimeToAnswer.toString()} seconds`,
    },
    {
      label: "Shortest Time to Answer",
      value: `${scoreboard.shortestTimeToAnswer.toString()} seconds`,
    },
  ];

  // save scoreboard to local storage only once
  useEffect(() => {
    Storage.addScoreboard(scoreboard);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <h4 className="font-bold text-3xl">Quiz completed!</h4>
      <table className="border-collapse border border-slate-500">
        <tbody>
          {statistics.map((stat, key) => (
            <tr key={key}>
              <td className="border border-slate-600 p-4 text-left">
                {stat.label}
              </td>
              <td className="border border-slate-600 p-4 text-right">
                {stat.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <p>
        <Link onClick={onRetry} className="self-center">
          Retry
        </Link>
        <span>, </span>
        <Link to="/">Go back to Home</Link>
        <span> or </span>
        <Link to="/scoreboard">View Scoreboard</Link>
      </p>
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

  const stopwatchRef = useRef<StopwatchImperativeHandle>(null);
  const timeTakenArray = useRef<number[]>([]);

  const onRetry = () => {
    window.location.reload();
  };

  const checkAnswer = async (option: string) => {
    if (!currentQuestion) {
      return;
    }

    // record time taken to choose an answer
    timeTakenArray.current.push(stopwatchRef.current?.getTime() ?? 0);

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
    stopwatchRef.current?.reset();
  };

  const renderBody = () => {
    if (bank.length === 0) {
      return (
        <div>
          <p>Quiz not available.</p>
          {quizType === "n5Bookmark" && (
            <p>
              Bookmark some words from <Link to="/n5quiz">this quiz</Link> to
              start the quiz
            </p>
          )}
        </div>
      );
    }

    if (currentQuestion && answers) {
      return (
        <>
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
          <Stopwatch ref={stopwatchRef} />
        </>
      );
    }

    if (questionIndex >= totalQuestions) {
      return (
        <QuizCompletedView
          correctAnswers={correctAnswers}
          onRetry={onRetry}
          timeTakenArray={timeTakenArray.current}
        />
      );
    }
  };

  useEffect(() => {
    const ref = stopwatchRef.current;

    if (currentQuestion) {
      ref?.start();
    }

    return () => {
      ref?.stop();
    };
  });

  return (
    <>
      <div className="flex flex-col gap-32 ">
        <div className="flex gap-2 justify-center">
          <Link to="/">
            <h1 className="font-bold text-xl">JLPT N5 Vocab</h1>
          </Link>
        </div>
        {renderBody()}
      </div>
      <ToastContainer
        position="bottom-center"
        theme="dark"
        closeOnClick
        autoClose={1000}
      />
    </>
  );
}
