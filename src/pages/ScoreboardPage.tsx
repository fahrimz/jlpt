import { ScoreboardItem } from "@data";
import { Storage } from "@utility";
import { useEffect, useState } from "react";

export const ScoreboardPage = () => {
  const [scoreboard, setScoreboard] = useState<ScoreboardItem[]>([]);

  /**
   * TODO: calculate and check the fastest and highest score to answer
   */

  useEffect(() => {
    setScoreboard(Storage.getAllScoreboards());
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <h1>Scoreboard</h1>

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
          {scoreboard.length > 0 ? (
            scoreboard.map((item, key) => (
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
