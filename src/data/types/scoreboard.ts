export type TQuizType = "n5" | "n5Bookmark" | "hiragana" | "katakana";

export interface ScoreboardItem {
  quizType: TQuizType;
  createdAt: string;
  totalQuestion: number;
  correctAnswers: number;
  totalTimeTaken: number;
  longestTimeToAnswer: number;
  shortestTimeToAnswer: number;
}
