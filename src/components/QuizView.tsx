import { TQuizType, TWord } from "@data";
import { OptionButton } from "./OptionButton";
import { BookmarkView } from "./BookmarkView";
import { useEffect } from "react";

export const QuizView = ({
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      answers.forEach((option, i) => {
        if ((i + 1).toString() === e.key) {
          checkAnswer(option);
        }
      })
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  })

  return (
    <div className="flex flex-col gap-8 justify-center">
      <h1>{currentQuestion.english}</h1>
      <div className="flex gap-4 flex-col sm:flex-row sm:justify-center">
        {answers.map((option, i) => (
          <OptionButton
            key={option}
            index={i}
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