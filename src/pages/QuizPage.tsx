import { QuizCompletedView, QuizView, Stopwatch } from "@components";
import {
  Constants,
  getAnswerOptions,
  getRandomItems,
  getShownJapanese,
  sleep,
} from "@utility";
import {
  TQuizType,
  TWord,
} from "@data";
import { useEffect, useMemo, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import audioCorrect from "../assets/audio/correct.mp4";
import audioIncorrect from "../assets/audio/incorrect.mp4";
import { Link } from "@tanstack/react-router";
import { StopwatchImperativeHandle } from "src/components/Stopwatch";

const audioCorrectAnswer = new Audio(audioCorrect);
const audioIncorrectAnswer = new Audio(audioIncorrect);

interface QuizPageProps {
  quizType: TQuizType;
  preferredTotalQuestions: number;
  questionBank: TWord[];
  answerBank: TWord[];
  title: string;
}

export function QuizPage({
  quizType = "n5",
  preferredTotalQuestions = Constants.defaultTotalQuestion,
  questionBank,
  answerBank,
  title
}: QuizPageProps) {
  const totalQuestions = Math.min(preferredTotalQuestions, questionBank.length);
  const questions = useMemo(
    () => getRandomItems(questionBank, totalQuestions),
    [questionBank, totalQuestions]
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
    if (questionBank.length === 0) {
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
          quizType={quizType}
          totalQuestion={totalQuestions}
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
            <h1 className="font-bold text-xl">{title}</h1>
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
