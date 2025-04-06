import { TQuizType, TWord } from "@data";
import { useState, useEffect } from "react";
import { Storage } from "@utility";

export const BookmarkView = ({
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