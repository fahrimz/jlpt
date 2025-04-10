import { Header } from "@components";
import { ScoreboardItem } from "@data";
import { Storage } from "@utility";
import { useEffect, useState } from "react";

export const ScoreboardPage = () => {
  const [scoreboard, setScoreboard] = useState<ScoreboardItem[]>([]);
  const sortedScoreboard = scoreboard.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  /**
   * TODO: calculate and check the fastest and highest score to answer
   */

  useEffect(() => {
    setScoreboard(Storage.getAllScoreboards());
  }, []);

  return (
    <div className="flex flex-col">
      <Header title='Scoreboard' />

      <table className="table-auto">
        <thead>
          <tr>
            <th className="border p-4">Time</th>
            <th className="border p-4">Quiz Type</th>
            <th className="border p-4">Correct Answers</th>
            <th className="border p-4">Total Time Taken</th>
            <th className="border p-4">Longest Time to Answer</th>
            <th className="border p-4">Shortest Time to Answer</th>
          </tr>
        </thead>
        <tbody>
          {sortedScoreboard.length > 0 ? (
            sortedScoreboard.map((item, key) => (
              <tr key={key}>
                <td className="border p-4">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="border p-4">{item.quizType}</td>
                <td className="border p-4">{item.correctAnswers} {item.totalQuestion > 0 && `/ ${item.totalQuestion.toString()}`}</td>
                <td className="border p-4">{item.totalTimeTaken} second</td>
                <td className="border p-4">{item.longestTimeToAnswer} second</td>
                <td className="border p-4">{item.shortestTimeToAnswer} second</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border p-4" colSpan={5}>
                No data yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
