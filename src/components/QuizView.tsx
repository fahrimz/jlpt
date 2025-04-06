import { TQuizType, TWord } from "@data";
import { OptionButton } from "./OptionButton";
import { BookmarkView } from "./BookmarkView";

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