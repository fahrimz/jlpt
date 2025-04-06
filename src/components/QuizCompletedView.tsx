import { ScoreboardItem, TQuizType } from "@data";
import { useEffect, useMemo } from "react";
import { Storage } from "@utility";
import { Link } from "@tanstack/react-router";

export const QuizCompletedView = ({
  quizType,
  correctAnswers,
  onRetry,
  timeTakenArray,
  totalQuestion
}: {
  quizType: TQuizType;
  correctAnswers: number;
  onRetry: () => void;
  timeTakenArray: number[];
  totalQuestion: number;
}) => {
  const scoreboard: ScoreboardItem = useMemo(
    () => ({
      quizType,
      createdAt: new Date().toISOString(),
      correctAnswers,
      totalTimeTaken: timeTakenArray.reduce((acc, curr) => acc + curr, 0),
      longestTimeToAnswer: Math.max(...timeTakenArray),
      shortestTimeToAnswer: Math.min(...timeTakenArray),
      totalQuestion
    }),
    [correctAnswers, quizType, timeTakenArray, totalQuestion]
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
        <Link onClick={onRetry} className="self-center" to=".">
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